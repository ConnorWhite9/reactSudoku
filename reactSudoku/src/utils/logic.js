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

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
}

function mapHasKey(map, searchKey) {
    for (let key of map.keys()) {
        if (Array.isArray(key) && key.length === searchKey.length && key.every((val, i) => val === searchKey[i])) {
            return key; // Return actual reference
        }
    }
    return null; // Key not found
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
            for (let i = 1; i < this.sudoku.boxNum; i++) {
                this.domains[key].push(i);
                shuffleArray(this.domains[key]);
            }

        }

        this.playerboard = this.solve();
        this.incomplete = null;
    }

    assignment_complete(assignment) {
        if (assignment.size === (this.sudoku.type ** 2)) {
            return true;
        } else {
            return false; 
        }
    }

    printAssignment(assignment) {
        console.log("Board: ");
        for (let i = 0; i < this.sudoku.type; i++) {
            let row = '';
            let list = [];
            for (let j = 0; j < this.sudoku.type; j++) {
                let strKey = `${i},${j}`;
                list.push(assignment.get(strKey));
            }
            console.log(list.join(''));
            
        }
    }
    

    random_var(assignment) {
        let count = Infinity; // Use Infinity to ensure a proper min comparison
        let matches = [];
    
        for (const key in this.domains) { // Iterate over this.domains instead
            if (!assignment.has(key)) {  // Properly check if key is unassigned
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
        // Extract i and j from the string key
        let [i, j] = key.split(',').map(Number); // Convert string to integers
        let list = [];
        let revised = true;
    
        for (let s = 0; s < this.sudoku.type; s++) {
            // Convert [i, s] into string key "i,s"
            let strKey = `${i},${s}`;
            
            // Use .has() to check if the string key exists in the Map
            if (assignment.has(strKey)) {
                list.push(assignment.get(strKey)); // Get value associated with the string key
                if (this.domains[key].includes(assignment.get(strKey))) {
                    // Update the domain to filter out the value
                    this.domains[key] = this.domains[key].filter(item => item !== assignment.get(strKey));
                }
            }
        }
    
        // Adjust the condition to check the length of list and domain
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
            // Use .has() to check if the key [s, j] exists in the Map
            let strKey = `${i},${s}`;

            if (assignment.has(strKey)) {
                list.push(assignment.get(strKey));
                if (this.domains[key].includes(assignment.get(strKey))) {
                    // Filter out the value from the domain
                    this.domains[key] = this.domains[key].filter(item => item !== assignment.get(strKey));
                }
            }
        }
    
        // Adjust the condition to check the length of list and domain
        if ((this.sudoku.type - list.length) < this.domains[key].length) {
            revised = false;
        }
    
        return revised;
    }
    

    boxCheck(key, assignment) {
        let l = 0;
        let list = [];
        let revised = true;
    
        // Find the correct box that contains the key
        for (const box in this.sudoku.box) {
            if (this.sudoku.box[box].some(arr => arr === key)) {
                l = box;
                break;
            }
        }
    
        // Check the slots in the identified box
        for (const slot of this.sudoku.box[l]) {
            // Use the string key format "i,j"
            let strKey = `${slot[0]},${slot[1]}`;
    
            // Use .has() to check if the string key exists in the Map
            if (assignment.has(strKey)) {
                list.push(assignment.get(strKey));
                // If the value exists in the domain, filter it out
                if (this.domains[key].includes(assignment.get(strKey))) {
                    this.domains[key] = this.domains[key].filter(value => value !== assignment.get(strKey));
                }
            }
        }
    
        // Check if the revised condition holds
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
        // Iterate through each variable in the sudoku variables
        for (const key of this.sudoku.variables) {
            // Convert the key to string format "i,j"
    
            // Check if the key exists in the assignment map (using string format)
            if (!assignment.has(key)) {
                // If the key doesn't exist in the assignment, revise the domain of the key
                if (!this.revise(key, assignment)) {
                    return false;
                }
            }
        }
        return true;
    }
    

    inferences(assignment) {
        let fh = [];
        
        // Iterate over each variable in the sudoku variables
        for (const key of this.sudoku.variables) {
            // Check if the domain has only one value and the key is not in the assignment
            if (this.domains[key].length === 1 && !assignment.has(key)) {
                // Assign the value from the domain to the assignment map
                assignment.set(key, this.domains[key][0]);
                fh.push(key);
            }
        }
        
        // Return both the updated assignment map and the list of keys (fh)
        return [assignment, fh];
    }

    reset() {
        for (const key in this.sudoku.variables) {
            this.domains[key] = Array.from({ length: this.sudoku.height - 1 }, (_, i) => i + 1);
            this.domains[key] = this.domains[key].sort(() => Math.random() - 0.5); // Shuffle 
        }
    }

    horizontalConsistency(assignment, key) {
        let [i, j] = key;
        let list = [];
        
        // Loop through the horizontal values in the row
        for (let s = 0; s < this.sudoku.type; s++) {
            let searchKey = `${i},${s}`; // Convert the key to a string format
            
            if (assignment.has(searchKey)) { // Check if the string key exists
                list.push(assignment.get(searchKey)); // Use the actual value
            }
        }
        
        // Return whether all values are unique (consistency check)
        return list.length === new Set(list).size;
    }
    
    verticalConsistency(assignment, key) {
        let [i, j] = key;
        let list = [];
        
        // Loop through the vertical values in the column
        for (let s = 0; s < this.sudoku.type; s++) {
            let searchKey = `${s},${j}`; // Convert the key to a string format
            
            if (assignment.has(searchKey)) { // Check if the string key exists
                list.push(assignment.get(searchKey)); // Use the actual value
            }
        }
        
        // Return whether all values are unique (consistency check)
        return list.length === new Set(list).size;
    }
    
    boxConsistency(assignment) {
        let box = this.sudoku.type === 9 ? this.sudoku.box : this.sudoku.boxSmall;
        
        // Loop through each box
        for (let i = 0; i < box.length; i++) {
            let list = [];
            
            // Loop through each value in the box
            for (let value of box[i]) {
                let searchKey = `${value[0]},${value[1]}`; // Convert each key to string format
                
                if (assignment.has(searchKey)) { // Check if the string key exists
                    list.push(assignment.get(searchKey)); // Use the actual value
                }
            }
            
            // Return false if any duplicates are found
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
            // Run checking measures if assignment is complete
            for (const key of this.sudoku.variables) {
                console.log("Assignment assessment before failure:", assignment);
                if (!this.consistency(assignment, key)) {
                    
                    this.printAssignment(assignment); // print if inconsistent
                }
            }
            this.printAssignment(assignment); // print if inconsistent
            console.log("complete");
            return assignment;  // Return the valid assignment if complete
        }
    
        let variable = this.random_var(assignment);
        let list = this.domains[variable];
        // Try each value in the domain of the variable
        for (const value of list) {
            let test = structuredClone(assignment); // Clone the current assignment
            test.set(variable, value); // Try assigning a value to the variable
            
            if (this.ac3(test)) {  // Check if assignment is valid using AC-3
                //console.log("assignment", assignment)
                assignment.set(variable,value);  // Apply the value to the assignment
                let fh;
                [assignment, fh] = this.inferences(assignment);  // Get new inferences
                
                this.ac3(assignment); // Re-run AC-3 with updated assignment
                
                // Recurse with the new assignment
                let newAssignment = this.backtrack(assignment);
                
                if (newAssignment != null) {
                    return newAssignment;  // Return the valid assignment if found
                } else {
                    assignment.delete(variable);  // Undo the assignment if failed
                    
                    // Undo inferences (delete those keys too)
                    for (const val of fh) {
                        assignment.delete(val);  // Corrected: delete the key, not the value
                    }
                }
            }
        }
        return null;  // Return null if no valid assignment found
    }
    

    solve() {
        return this.backtrack(new Map())
    }

}


function tester() {
    let base = new Sudoku(9);
    let test = new SudokuCreator(base);

    test.printAssignment(test.playerboard);
    return test;
}

export default tester;