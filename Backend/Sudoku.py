from CSP import CSP

puzzle = [[5, 3, 0, 0, 7, 0, 0, 0, 0],
          [6, 0, 0, 1, 9, 5, 0, 0, 0],
          [0, 9, 8, 0, 0, 0, 0, 6, 0],
          [8, 0, 0, 0, 6, 0, 0, 0, 3],
          [4, 0, 0, 8, 0, 3, 0, 0, 1],
          [7, 0, 0, 0, 2, 0, 0, 0, 6],
          [0, 6, 0, 0, 0, 0, 2, 8, 0],
          [0, 0, 0, 4, 1, 9, 0, 0, 5],
          [0, 0, 0, 0, 8, 0, 0, 7, 9]]

def display(puzzle):
    for i in range(len(puzzle)):
        if i % 3 == 0 and i != 0:
            print("- - - - - - - - - - -  ")
        for j in range(len(puzzle[i])):
            if j % 3 == 0 and j != 0:
                print("| ", end="")

            print(puzzle[i][j], end=" ")
        print()

if __name__ == "__main__":
    print("Initial Sudoku:")
    display(puzzle)

    variable = [(i,j) for  i in range(9) for j in range(9)]
    domains = {}
    constrains = None
    csp = CSP(variable,domains,constrains)
    csp.initialize_domains(puzzle)
    csp.apply_constraints()
    if csp.backtrack({}):
        solved_grid = [[0]*9 for _ in range(9)]
        for (r,c) in csp.solution:
            solved_grid[r][c] = csp.solution[(r,c)]
        print("Solved Sudoku:")
        display(solved_grid)
    else:
        print("No solution found")



