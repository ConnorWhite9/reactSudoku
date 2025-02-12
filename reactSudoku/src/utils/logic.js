const TwoBox = {
    1: [[0, 0], [0, 1], [1, 0], [1, 1]],
    2: [[2, 0], [3, 0], [2, 1], [3, 1]],
    3: [[0, 2], [0, 3], [1, 2], [1, 3]],
    4: [[2, 2], [2, 3], [3, 2], [3, 3]]
};

const ThreeBox = {
    1: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]],
    2: [[3, 0], [4, 0], [5, 0], [5, 1], [3, 1], [4, 1], [5, 2], [3, 2], [4, 2]],
    3: [[6, 0], [7, 0], [8, 0], [6, 1], [7, 1], [8, 1], [6, 2], [7, 2], [8, 2]],
    4: [[0, 3], [1, 4], [2, 3], [0, 4], [1, 3], [2, 4], [0, 5], [1, 5], [2, 5]],
    5: [[0, 6], [1, 6], [2, 6], [0, 7], [1, 7], [2, 7], [0, 8], [1, 8], [2, 8]],
    6: [[3, 3], [4, 3], [5, 3], [5, 4], [3, 4], [4, 4], [5, 5], [3, 5], [4, 5]],
    7: [[3, 6], [4, 6], [5, 6], [5, 7], [3, 7], [4, 7], [5, 8], [3, 8], [4, 8]],
    8: [[6, 3], [7, 3], [8, 3], [6, 4], [7, 4], [8, 4], [6, 5], [7, 5], [8, 5]],
    9: [[6, 6], [7, 6], [8, 6], [6, 7], [7, 7], [8, 7], [6, 8], [7, 8], [8, 8]]
};

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
}

class Sudoku {
    constructor(type) {
        this.variables = new Set(); // Use 'this.' to reference instance properties
        for (let i = 0; i < type; i++) { // Use 'let' for loop variables
            for (let j = 0; j < type; j++) {
                this.variables.add((i, j)); // Store as a string or array
            }
        }

        this.length = type + 1; // Use 'this.' for instance properties
        this.height = type + 1;
        this.type = type; // Correctly assign type

        this.nums = Array.from({ length: type ** 2 }, (_, i) => i + 1); // Generate range
    
        if (type == 4) {
            this.box = TwoBox;
            this.boxNum = 5;
            this.boxHeight = 2;
        }
        else if (type == 9 ) {
            this.box = ThreeBox;
            this.boxHeight = 3;
            this.boxNum = 10;
        }
        else {
            this.box = FourBox;
            this.boxNum = 17;
            this.boxHeight = 4;
        }
    }
}

class SudokuCreator {
    constructor(sudoku) {
        this.sudoku = sudoku;

        this.domains = {}

        for (const key of this.sudoku.variables) {
            this.domains[key] = [];
            for (i = 1; i < self.sudoku.boxHeight; i++) {
                this.domains[key].push(i);
                shuffleArray(domains);
            }

        }

        this.playerboard = null;
        this.incomplete = null;
    }

    assignment_complete(assignment) {
        if (Object.keys(assignment).length == (this.sudoku.type ** 2)) {
            return true;
        } else {
            return false; 
        }
    }

    printAssignment(assignment) {
        console.log("Board: ");
        for (let i = 0; i < this.sudoku.type; i++) {
            let row = '';
            for (let j = 0; j < this.sudoku.type; j++) {
                let key = `${i},${j}`;
                if (key in assignment) {
                    row += assignment[key];
                } else {
                    row += " ";
                }
            }
            console.log(row);
        }
        console.log();

    }

    random_var(assignment) {
        let count = 100;
        let matches = [];
        for (const key in assignment) {
            if (!Object.keys(assignment).includes(key)) {
                if (this.domains[key].length < count) {
                    matches = [];
                    matches.push(key);
                    count = this.domains[key].length;
                } else if (this.domains[key].length == count) {
                    matches.push(key);
                } else {
                    continue;
                }
            }
        }
        return arr[Math.floor(Math.random() * arr.length)];
    }

    verticalCheck(key, assignment) {
        let [i, j] = key
        let list = [];
        let revised = true;

        for (s = 0; s < this.sudoku.type; s++) {
            if ((i, s) in assignment) {
                list.push(assignment[i, s]);
                if (this.domains[key].includes(assignment[i, s])) {
                    this.domains[key] =  this.domains[key].filter(item => item !== assignment[i, s]);
                }
            }
        }
        if ((this.sudoku.type - list.length) < this.domains[key].length) {
            revised = false;
        }
        return revised
    }

    horizontalCheck(key, assignment) {
        let [i, j] = key
        let list = [];
        let revised = true;

        for (s = 0; s < this.sudoku.type; s++) {
            if ((s, j) in assignment) {
                list.push(assignment[s, j]);
                if (this.domains[key].includes(assignment[s, j])) {
                    this.domains[key] =  this.domains[key].filter(item => item !== assignment[s, j]);
                }
            }
        }
        if ((this.sudoku.type - list.length) < this.domains[key].length) {
            revised = false;
        }
        return revised
    }

    boxCheck(key, assignment) {
        let l = 0;
        let list = [];
        revised = true;
        for (const box in this.sudoku.box) {
            if (this.sudoku.box[box].includes(key)) {
                l = key;
                break;
            }
        }

        for (const slot of this.sudoku.box[l]) {
            if (assignment.hasOwnProperty(slot)) {
                list.push(assignment[slot]);
                if (this.domains[key].includes(assignment[slot])) {
                    this.domains[key] = this.domains[key].filter(value => value !== assignment[slot]); // Remove the value
                }
            }
        }
    }

    revise(key, assignment) {
        if (verticalCheck(key, assignment) && horizontalCheck(key, assignment) && boxCheck(key, assignment)) {
            return true;
        } else {
            return false;
        }
    }

    ac3(assignment) {
        for (const key of this.sudoku.variables) {
            if (!Object.keys(assignment).includes(key)) {
                if (!revise(key, assignment)) {
                    return false;
                }
            }
        }
        return true;
    }

    inferences(assignment) {
        let fh = [];
        for (const key in this.sudoku.variables) {
            if (this.domains[key].length == 1 && !key in assignment) {
               assignment[key] = this.domains[key][0];
               fh.push(key);
            }
        }
        return assignment, fh;
    }

    reset() {
        for (const key in this.sudoku.variables) {
            this.domains[key] = Array.from({ length: this.sudoku.height - 1 }, (_, i) => i + 1);
            this.domains[key] = this.domains[key].sort(() => Math.random() - 0.5); // Shuffle 
        }
    }

    horizontalConsistency(assignment, key) {
        let i, j;
        [i, j] = key
        let list = [];
        for (s = 0; s < this.sudoku.type; s++ ) {
            if ((s, j) in assignment) {
                list.push(assignment[s, j]);
            }
        }
        if (list.length !== new Set(list).size) {
            return false;
        } else {
            return true;
        }
    }
     
    verticalConsistency(assignment, key) {
        let i, j;
        [i, j] = key;
        let list = [];
        for (s = 0; s < this.sudoku.type; s++) {
            if ((i, s) in assignment) {
                list.push(assignment[i, s]);
            }
        }
        if (list.length !== new Set(list).size) {
            return false;
        } else {
            return true;
        }
    }

    boxConsistency(assignment) {
        if (Math.floor(Math.sqrt(Object.values(assignment).length)) === 9) {
            var box = ThreeBox;
        } else {
            var box = TwoBox;
        }
        
        for (let i = 1; i <= box.length; i++) {
            let list = [];
            for (let value of box[i]) {
                list.push(assignment[`${value}`]);
            }
            if (list.length !== new Set(list).size) {
                return false;
            }
        }
        
        return true;
    }

    consistency(assignment, key) {
        if (verticalConsistency(assignment, key) && horizontalConsistency(assignment, key)){
            if (boxConsistency(assignment)){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    backtrack(assignment) {
        if (assignment_complete(assignment)) {
            // run checking measures
            for (const key in this.sudoku.variables) {
                if (!consistency(assignment, key)) {
                    printAssignment(assignment);
                }
            }
            console.log("complete");
            return assignment;
        }
        let variable = random_var(assignment);
        let list = this.domains[variable];
        for (const value of list) {
            let test = structuredClone(assignment);
            test[variable] = value;
            if (ac3(test)) {
                assignment[variable] = value;
                let fh;
                [assignment, fh] = inferences(assignment);
                ac3(assignment);
                let newAssignment = backtrack(assignment);
                if (newAssignment != null) {
                    return assignment
                } else {
                    delete assignment[key]
                    for (const val of fh) {
                        delete assignment(val)
                    }
                }
            }
            reset()    
        }
        return null; 
    }

}