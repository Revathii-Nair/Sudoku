import copy

class CSP:
    def __init__(self,variables,domains,constraint):
        self.variables = variables
        self.domains = domains
        self.constraint = constraint
        self.solution = None

    def _is_complete(self,assignment):
        return len(assignment) == len(self.variables)
    
    def initialize_domains(self, puzzle):
        for var in self.variables:
            row,col = var
            if puzzle[row][col]==0:
                self.domains[var] = set(range(1,10))
            else:
                self.domains[var] = {puzzle[row][col]}
        self.apply_constraints()
    
    def apply_constraints(self):
        for var in self.variables:
            if len(self.domains[var])==1:
                row,col = var
                
                value = next(iter(self.domains[var]))
            
                # Row Pruning
                for r in range(9):
                    if r != row:
                        self.domains[(r,col)].discard(value)
                
                # Column Constraint
                for c in range(9):
                    if c !=col:
                        self.domains[(row,c)].discard(value)
                
                # Block Constraint
                block_col = (col//3)*3
                block_row = (row//3)*3
                for r in range(block_row,block_row+3):
                    for c in range(block_col,block_col+3):
                        if (r,c) != (row,col):
                            self.domains[(r,c)].discard(value)

    def _is_consistent(self, var, value, assignment):
        row,col = var

        # Row Check
        for r in range(9):
            if r!=row and (r,col) in assignment and assignment[r,col]==value:
                return False
        
        # Column Check
        for c in range(9):
            if c!=col and (row,c) in assignment and assignment[row,c] == value:
                return False
        
        # Block Check
        block_col = (col//3)*3
        block_row = (row//3)*3
        for r in range(block_row,block_row+3):
            for c in range(block_col,block_col+3):
                if (r,c) != (row,col) and (r,c) in assignment and assignment[r,c] == value:
                    return False
        
        return True
    
    def MRV_heuristic(self,assignment):
        min_d= 10
        var = None
        for v in self.variables:
            if v not in assignment:
                if len(self.domains[v]) <min_d:
                    min_d = len(self.domains[v])
                    var = v
        return var
    
    def backtrack(self,assignment):
        if self._is_complete(assignment):
            self.solution = assignment
            return True
        
        var = self.MRV_heuristic(assignment)
            
        for value in self.domains[var]:
            if self._is_consistent(var,value,assignment):
                copy_domains = copy.deepcopy(self.domains)
                self.domains[var] ={value}
                assignment[var] = value
                self.apply_constraints()

                if self.backtrack(assignment):
                    return True
                
                assignment.pop(var)
                self.domains = copy_domains
        return False



