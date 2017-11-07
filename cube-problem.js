/**
 * Created by Kike on 11/7/17.
 */
function processData(input) {
    var instructions = input.split("\n");
    let testCases;
    var matrix = {};
    var matrixDimension, operations;
    instructions.map((instruction) => {
        if(instruction.length == 1){
            testCases = parseInt(instruction);
        } else if(isCreatingNewMatrix(instruction)){
            [matrixDimension, operations] = instruction.split(' ');
            matrix = null; // garbage collect it
            matrix = createMatrix(parseInt(matrixDimension))
        } else if(isUpdateInstruction(instruction)){
            var [,x,y,z,value] = instruction.split(" ");
            var dimension = x + "." + y + "." + z;
            matrix[dimension] = parseInt(value)
        } else if (isQueryInstruction(instruction)){
            var [,x1,y1,z1,x3,y3,z3] = instruction.split(" ");
            var acc = 0;
            Object.keys(matrix).map(coordinatesKey => {
                if(areCoordinatesBetween(coordinatesKey,x1,y1,z1,x3,y3,z3)){
                    acc += matrix[coordinatesKey]
                }
            });
            console.log(acc);
        }
    })
}

function isCreatingNewMatrix(instruction){
    return instruction.split(' ').length == 2 && !isNaN(parseInt(instruction.split(' ')[0])) && !isNaN(parseInt(instruction.split(' ')[1]));
}

function createMatrix(n){
    //get All Numbers -> add all numbers to each number (1,1 ; 1,2; 1,3; 2,1 ,etc) -> remove helper at the beggining -> add all numbers again
    return getAllNumbersAsStringArray(n).reduce(addNumberToTheEnd,[n]).slice(1).reduce(addNumberToTheEnd,[n]).slice(1).reduce((matrixObject,key) => {
        matrixObject[key] = 0;
        return matrixObject
    },{});
}

function addNumberToTheEnd(accumulatedArray,number) {
    return accumulatedArray.concat(getAllNumbersAsStringArray(accumulatedArray[0]).map(numberAsString => number + "." + numberAsString));
}
function getAllNumbersAsStringArray(upperLimit){
    return [...Array(upperLimit)].map((_,i) => i+1 ).map(e => e.toString())
}

function isUpdateInstruction(instruction){
    return instruction.split(" ")[0] == "UPDATE";
}

function isQueryInstruction(instruction){
    return instruction.split(" ")[0] == "QUERY";
}

function areCoordinatesBetween(coordinates, x1, y1, z1, x3, y3, z3){
    var [x2,y2,z2] = coordinates.split(".");
    var xFits = parseInt(x1) <= parseInt(x2) && parseInt(x2) <= parseInt(x3);
    var yFits = parseInt(y1) <= parseInt(y2) && parseInt(y2) <= parseInt(y3);
    var zFits = parseInt(z1) <= parseInt(z2) && parseInt(z2) <= parseInt(z3);
    return xFits && yFits && zFits
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});

