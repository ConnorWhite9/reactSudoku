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

function horizontalCheck(completed) {
    for (let i = 0; i < Math.floor(Math.sqrt(Object.values(completed).length)); i++) {
        let list = [];
        for (let j = 0; j < Math.floor(Math.sqrt(Object.values(completed).length)); j++) {
            list.push(completed[`${i},${j}`]);
        }
        if (list.length !== new Set(list).size) {
            return false;
        }
    }
    return true;
}
function verticalCheck(completed) {
    for (let j = 0; j < Math.floor(Math.sqrt(Object.values(completed).length)); j++) {
        let list = [];
        for (let i = 0; i < Math.floor(Math.sqrt(Object.values(completed).length)); i++) {
            list.push(completed[`${i},${j}`]);
        }
        if (list.length !== new Set(list).size) {
            return false;
        }
    }
    return true;
}

function boxCheck(completed){
    let box;
    if (Math.floor(Math.sqrt(Object.values(completed).length)) === 9) {
        box = ThreeBox;
    } else {
        box = TwoBox;
    }
    
    for (let i = 1; i <= box.length; i++) {
        let list = [];
        for (const value of box[i]) {
            list.push(completed[value]);
        }
        if (list.length !== new Set(list).size) {
            return false;
        }
    }
    return true;

}

function checker(completed) {
    return (verticalCheck(completed) && horizontalCheck(completed) && boxCheck(completed)) ;
    
}




export default checker;