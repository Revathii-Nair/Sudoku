# Sudoku Game & Solver

SudoQuest is a full-stack web application where you can play regular Sudoku matches or use the special solver tool to find the solution for any difficult puzzle.

## Live Demo - [Click here to try it out now.](https://sudoquest.vercel.app)

## Project Objective

The main goal of this project was to understand how a Python based AI engine applies step‑by‑step logic to solve Sudoku puzzles, while providing a clean, interactive game experience.

This project implements a Constraint Satisfaction Problem (CSP) framework with standard heuristics. This allows the backend to instantly rule out wrong options and find the correct solution immediately.

### Core Game Theory Logic Used

- **Constraint Satisfaction (CSP):** The solver understands that numbers 1 to 9 cannot repeat in any row, column, or $3 \times 3$ box.
- **Forward Checking:** As soon as a number is placed, the solver removes that number from all connected empty boxes so it doesn't waste time looking at wrong options.
- **MRV Heuristic (Most Restrained First):** Chooses the cell with the fewest valid options to reduce branching.
- **Backtracking Search:** Retraces steps when stuck, trying alternate paths until the puzzle is solved.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Lucide Icons.
- **Backend (Solver):** Python, FastAPI (with SlowAPI for rate limiting).
- **Sudoku API:** Integrated with [YouDoSudoku](https://www.youdosudoku.com/) API to fetch randomized puzzles whenever a player selects Easy, Medium, or Hard mode.
- **Deployment:** Vercel

---

## Project Structure

```text
SudoQuest/
├── Frontend/                  # React UI
│   ├── src/
│   │   ├── components/
│   │   │   └── GameGrid.jsx     # The 9x9 Sudoku board view
│   │   ├── pages/               # GamePage, SolvePage
│   │   └── api.jsx              # Connects to backend
└── Python-API/                # FastAPI + CSP solver
    └── CSP.py                 # Constraint satisfaction + heuristics

```

---

## How to Play the game

1. **Play a Game (Play Mode):**

- Open the app and click on **Easy**(Default), **Medium**, or **Hard** mode to start.
- Select any cell and use the number buttons to fill it.
- You can use **Mark Mode** to take notes (pencil marks) or click **Hint** if you get stuck and need the solver to help you with one correct step.

2. **Test the Sudoku Solver (Solver Mode):**

- Go to the menu and click on the **Solver** page.
- Take any hard Sudoku puzzle from a newspaper or book and type it directly into the blank grid.
- Click the **SOLVE** button and watch how the algorithm instantly fills up the entire board with the perfect solution.

## Future Quest

- **User Accounts & Profiles:** Add authentication so players can save progress, track stats, and compete on leaderboards.
- **Daily Challenge Mode:** Generate a new puzzle each day for consistent engagement.
- **Advanced Hints:** Provide step‑by‑step solver explanations instead of just filling a number.
