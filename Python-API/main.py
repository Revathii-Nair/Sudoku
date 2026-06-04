from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from slowapi import Limiter
from slowapi.util import get_remote_address
from CSP import CSP


app = FastAPI()
limiter = Limiter(key_func= get_remote_address)

app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

class Puzzle(BaseModel):
    puzzle: list[list[int]]

@app.get("/")
def display():
    return "PYTHON API is working on 8000"

@app.post("/solve/")
@limiter.limit("10/minute")
def solve_sudoku(request: Request,p: Puzzle):   
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
            print("Solved Sudoku:")
            return solved_grid
        else:
            return "No solution found"
    
    except ValueError as e:
        return str(e)
