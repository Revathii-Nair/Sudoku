from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from slowapi import Limiter
from slowapi.util import get_remote_address
from CSP import CSP
import random
import os
import requests
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
limiter = Limiter(key_func= get_remote_address)
api_key = os.getenv("SUDOKU_GENERATOR_API_KEY")



app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

class Puzzle(BaseModel):
    puzzle: list[list[int]]

puzzle_try=[
    [5, 3, 0, 0, 7, 0, 0, 0, 2],
    [6, 7, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 6, 8, 0, 3, 7, 0, 1],
    [7, 1, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 7, 2, 8, 4],
    [0, 0, 7, 4, 1, 9, 0, 0, 5],
    [0, 4, 0, 0, 8, 0, 0, 7, 9],
  ]

@app.get("/getPuzzle")
def static_puzzle():
    return puzzle_try

@app.get("/getRandomPuzzle/{mode}")
def random_puzzle(mode:str):
    modes = {
        "EASY":"easy",
        "MEDIUM":"medium",
        "HARD":"hard"
    }
    if mode not in modes:
        return "Invalid Mode"
    
    headers = {"Content-Type": "application/json", "x-api-key": api_key }
    body = {"difficulty": modes[mode], "solution": False, "array": True }
    response = requests.post("https://youdosudoku.com/api/",json=body, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        puzzle = [[int(cell) for cell in row] for row in data["puzzle"]]
        return puzzle
   



@app.post("/solve/")
@limiter.limit("10/minute")
def solve_sudoku(request: Request,p: Puzzle):   
    return call_csp(p)


def get_random_puzzle(mode):
    p = Puzzle(puzzle=[[0]*9 for _ in range(9)])
    row = random.randrange(9)
    col = random.randrange(9)
    num = random.randrange(1,10)
    p.puzzle[row][col] = num
    puzzle = call_csp(p)

    for _ in range(mode):
        row = random.randrange(9)
        col = random.randrange(9)
        if(puzzle[row][col]==0):
            continue
        puzzle[row][col]=0

    return puzzle


def call_csp(p:Puzzle):
    try:
        variable = [(i,j) for  i in range(9) for j in range(9)]
        domains = {}
        csp = CSP(variable,domains,None)
        csp.initialize_domains(p.puzzle)
        csp.apply_constraints()
        if csp.backtrack({}):
            solved_grid = [[0]*9 for _ in range(9)]
            for (r,c) in csp.solution:
                solved_grid[r][c] = csp.solution[(r,c)]
            return solved_grid
        else:
            return False
    
    except ValueError as e:
        return str(e)