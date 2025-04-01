const TwoBox = {
    1: ["0,0", "0,1", "1,0", "1,1"],
    2: ["2,0", "3,0", "2,1", "3,1"],
    3: ["0,2", "0,3", "1,2", "1,3"],
    4: ["2,2", "2,3", "3,2", "3,3"]
};

const ThreeBox = {
    1: ["0,0", "1,0", "2,0", "0,1", "1,1", "2,1", "0,2", "1,2", "2,2"],
    2: ["3,0", "4,0", "5,0", "5,1", "3,1", "4,1", "5,2", "3,2", "4,2"],
    3: ["6,0", "7,0", "8,0", "6,1", "7,1", "8,1", "6,2", "7,2", "8,2"],
    4: ["0,3", "1,4", "2,3", "0,4", "1,3", "2,4", "0,5", "1,5", "2,5"],
    5: ["0,6", "1,6", "2,6", "0,7", "1,7", "2,7", "0,8", "1,8", "2,8"],
    6: ["3,3", "4,3", "5,3", "5,4", "3,4", "4,4", "5,5", "3,5", "4,5"],
    7: ["3,6", "4,6", "5,6", "5,7", "3,7", "4,7", "5,8", "3,8", "4,8"],
    8: ["6,3", "7,3", "8,3", "6,4", "7,4", "8,4", "6,5", "7,5", "8,5"],
    9: ["6,6", "7,6", "8,6", "6,7", "7,7", "8,7", "6,8", "7,8", "8,8"]
};

function probability() {
    const nums = [1, 0];
    const probabilities = [6/9, 3/9];  // Probabilities must sum to 1, so this should be [7/9, 2/9]
    
    // Generate a random value based on the probabilities
    const boolean = randomChoice(nums, probabilities);
    
    return boolean === 1;
}

// Helper function to simulate random.choices in JavaScript
function randomChoice(arr, probabilities) {
    let randomValue = Math.random();
    let cumulativeProbability = 0;
    
    for (let i = 0; i < arr.length; i++) {
        cumulativeProbability += probabilities[i];
        if (randomValue < cumulativeProbability) {
            return arr[i];
        }
    }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}

function range(start, stop, step = 1) {
    if (stop === undefined) {
      stop = start;
      start = 0;
    }
  
    const result = [];
    for (let i = start; i < stop; i += step) {
      result.push(i);
    }
    return result;
  }



class Sudoku {
    constructor(type) {
        this.variables = new Set(); // Use 'this.' to reference instance properties
        for (let i = 0; i < type; i++) { // Use 'let' for loop variables
            for (let j = 0; j < type; j++) {
                this.variables.add(`${i},${j}`); // Store as a string (i,j) instead of array
            }
        }

        this.length = type + 1; // Use 'this.' for instance properties
        this.height = type + 1;
        this.type = type; // Correctly assign type

        this.nums = Array.from({ length: type ** 2 }, (_, i) => i + 1); // Generate range
        
        this.box;
        this.boxHeight;
        this.boxNum;
        this.row;
        this.column;
        this.sides;
        this.vertical;

        if (type == 4) {
            this.box = TwoBox;
            this.boxNum = 5;
            this.boxHeight = 2;
            this.row = [0, 1, 2, 3];
            this.column = [0, 1, 2, 3];
            this.sides = [1];
            this.vertical = [2];
        }
        else if (type == 9) {
            this.box = ThreeBox;
            this.boxHeight = 3;
            this.boxNum = 10;
            this.row = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            this.column = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            this.sides = [2, 5];
            this.vertical = [3, 6]
        }
        else {
            let FourBox = [];
            this.box = FourBox;
            this.boxNum = 17;
            this.boxHeight = 4;
            this.row = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            this.column = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        }
    }
}

class SudokuCreator {
    constructor(sudoku) {
        this.sudoku = sudoku;

        this.domains = {}

        for (const key of this.sudoku.variables) {
            this.domains[key] = [];
            for (let i = 1; i < this.sudoku.boxNum; i++) {
                this.domains[key].push(i);
                shuffleArray(this.domains[key]);
            }
        }

        this.playerboard = this.solve();
        this.incomplete = this.unsolve(this.playerboard);
    }

    assignment_complete(assignment) {
        if (Object.keys(assignment).length === (this.sudoku.type ** 2)) {
            return true;
        } else {
            return false; 
        }
    }

    printAssignment(assignment) {
        console.log("assignment:", assignment);
        console.log("Board: ");
        for (let i = 0; i < this.sudoku.type; i++) {
            let row = '';
            let list = [];
            for (let j = 0; j < this.sudoku.type; j++) {
                let strKey = `${i},${j}`;
                list.push(assignment[strKey]);
            }
            console.log(list.join(''));
            
        }
    }

    random_var(assignment) {
        let count = Infinity; // Use Infinity to ensure a proper min comparison
        let matches = [];
    
        for (const key in this.domains) { // Iterate over this.domains instead
            if (!(key in assignment)) {  // Properly check if key is unassigned
                let domainSize = this.domains[key].length;
    
                if (domainSize < count) {
                    matches = [key]; // Reset with new smallest found
                    count = domainSize;
                } else if (domainSize === count) {
                    matches.push(key);
                }
            }
        }
    
        // Return a random element if `matches` is not empty, otherwise return null (or handle it accordingly)
        return matches[Math.floor(Math.random() * matches.length)];
    }

    verticalCheck(key, assignment) {
        let [i, j] = key.split(',').map(Number); // Convert string to integers
        let list = [];
        let revised = true;
    
        for (let s = 0; s < this.sudoku.type; s++) {
            let strKey = `${s},${j}`;
            
            if (assignment[strKey]) {
                list.push(assignment[strKey]); // Get value associated with the string key
                if (this.domains[key].includes(assignment[strKey])) {
                    this.domains[key] = this.domains[key].filter(item => item !== assignment[strKey]);
                }
            }
        }
    
        if ((this.sudoku.type - list.length) < this.domains[key].length) {
            revised = false;
        }
    
        return revised;
    }

    horizontalCheck(key, assignment) {
        let [i, j] = key.split(',').map(Number); // Convert string to integers
        let list = [];
        let revised = true;
    
        for (let s = 0; s < this.sudoku.type; s++) {
            let strKey = `${i},${s}`;

            if (strKey in assignment) {
                list.push(assignment[strKey]);
                if (this.domains[key].includes(assignment[strKey])) {
                    this.domains[key] = this.domains[key].filter(item => item !== assignment[strKey]);
                }
            }
        }
    
        if ((this.sudoku.type - list.length) < this.domains[key].length) {
            revised = false;
        }
    
        return revised;
    }

    boxCheck(key, assignment) {
        let l = 0;
        let list = [];
        let revised = true;
    
        for (const box in this.sudoku.box) {
            if (this.sudoku.box[box].some(arr => arr === key)) {
                l = box;
                break;
            }
        }
        for (const slot of this.sudoku.box[l]) {
            let strKey = slot;
    
            if (strKey in assignment) {
                list.push(assignment[strKey]);
                if (this.domains[key].includes(assignment[strKey])) {
                    this.domains[key] = this.domains[key].filter(value => value !== assignment[strKey]);
                }
            }
        }
    
        if ((this.sudoku.type - list.length) < this.domains[key].length) {
            revised = false;
        }
        return revised;
    }

    revise(key, assignment) {
        if (this.verticalCheck(key, assignment) && this.horizontalCheck(key, assignment) && this.boxCheck(key, assignment)) {
            return true;
        } else {
            return false;
        }
    }

    ac3(assignment) {
        for (const key of this.sudoku.variables) {
            if (!(key in assignment)) {
                if (!this.revise(key, assignment)) {
                    return false;
                }
            }
        }
        return true;
    }

    inferences(assignment) {
        let fh = [];
        
        for (const key of this.sudoku.variables) {
            if (this.domains[key].length === 1 && !(key in assignment)) {
                assignment[key] = this.domains[key][0];
                fh.push(key);
            }
        }
        
        return [assignment, fh];
    }

    reset() {
        console.log("before reset", this.domains);
        for (const key of this.sudoku.variables) {
            // Create an array from 1 to sudoku.height
            let array = range(9);
            // Shuffle the array randomly
            this.domains[key] = shuffleArray(array);
            
        }
        console.log("after reset", this.domains);
        
    }

    horizontalConsistency(assignment, key) {
        let [i, j] = key;
        let list = [];
        
        for (let s = 0; s < this.sudoku.type; s++) {
            let searchKey = `${i},${s}`;
            
            if (searchKey in assignment) {
                list.push(assignment[searchKey]);
            }
        }
        
        return list.length === new Set(list).size;
    }
    
    verticalConsistency(assignment, key) {
        let [i, j] = key;
        let list = [];
        
        for (let s = 0; s < this.sudoku.type; s++) {
            let searchKey = `${s},${j}`;
            
            if (searchKey in assignment) {
                list.push(assignment[searchKey]);
            }
        }
        
        return list.length === new Set(list).size;
    }
    
    boxConsistency(assignment) {
        let box = this.sudoku.type === 9 ? this.sudoku.box : this.sudoku.boxSmall;
        
        for (let i = 0; i < this.sudoku.box.length; i++) {
            let list = [];
            
            for (let value of box[i]) {
                let searchKey = `${value[0]},${value[1]}`;
                
                if (searchKey in assignment) {
                    list.push(assignment[value]);
                }
            }
            
            if (list.length !== new Set(list).size) {
                return false;
            }
        }
        
        return true;
    }

    consistency(assignment, key) {
        if (this.verticalConsistency(assignment, key) && this.horizontalConsistency(assignment, key)){
            if (this.boxConsistency(assignment)){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    backtrack(assignment) {
        if (this.assignment_complete(assignment)) {
            console.log("Sudoku was completed");
            for (const key of this.sudoku.variables) {
                if (!this.consistency(assignment, key)) {
                    console.log("Failed");
                    this.printAssignment(assignment);
                    return
                }
            }
            this.printAssignment(assignment);
            return assignment;
        }
    
        let variable = this.random_var(assignment);
        let list = this.domains[variable];
        for (const value of list) {
            let test = { ...assignment }; // Clone the assignment object
            test[variable] = value;
            
            if (this.ac3(test)) {
                assignment[variable] = value;
                let fh;
                [assignment, fh] = this.inferences(assignment);
                
                this.ac3(assignment);
                
                let newAssignment = this.backtrack(assignment);
                
                if (newAssignment != null) {
                    return newAssignment;
                } else {
                    delete assignment[variable];
                    for (const val of fh) {
                        delete assignment[val];
                    }
                }
            }
            this.reset();
        }
        console.log("null");
        return null;
    }

    solve() {
        return this.backtrack({});
    }
    
    unsolve(assignment) {
        const copiedObject = { ...assignment };
        for (let i = 1; i < this.sudoku.boxNum; i++) {
            for (const key of this.sudoku.box[i]) {
                if (probability()) {
                    delete copiedObject[key];
                }
            }
        }
        return copiedObject;
    }
}

function tester(num) {
    let base = new Sudoku(num);
    let test = new SudokuCreator(base);
    if (test.playerboard == null) {
        console.log("test", test);
        console.error("This sudoku was invalid");
    }
    
    return test;
}

export default tester;
