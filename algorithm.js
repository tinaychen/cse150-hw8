var G0B0E0 = 322;
var G0B0E1 = 52;
var G0B1E0 = 197;
var G0B1E1 = 68;

var G1B0E0 = 150;
var G1B0E1 = 24;
var G1B1E0 = 471;
var G1B1E1 = 73;
var TOTAL = G0B0E0 + G0B0E1 + G0B1E0 + G0B1E1 + G1B0E0 + G1B0E1 + G1B1E0 + G1B1E1;

var currIter = 1;
var NUM_ITER = 3;

var iters = new Array(7);

for (var x = 0; x < iters.length; x++) {
    iters[x] = new Array(NUM_ITER);
}
// iters[0][0] = 0.6; //C = 0
//
// iters[1][0] = 0.4; //G = 0 | C = 0
// iters[2][0] = 0.6; //G = 0 | C = 1
//
// iters[3][0] = 0.2; //B = 0 | C = 0
// iters[4][0] = 0.1; //B = 0 | C = 1
//
// iters[5][0] = 0.2; //E = 0 | C = 0
// iters[6][0] = 0.4; //E = 0 | C = 1

iters[0][0] = 0.6; //C = 0

iters[1][0] = 0.4; //G = 0 | C = 0
iters[2][0] = 0.6; //G = 0 | C = 1

iters[3][0] = 0.2; //B = 0 | C = 0
iters[4][0] = 0.1; //B = 0 | C = 1

iters[5][0] = 0.2; //E = 0 | C = 0
iters[6][0] = 0.4; //E = 0 | C = 1

while(currIter < NUM_ITER) {
    var countC0 = calculateC0();
    iters[0][currIter] = countC0 / TOTAL;

    iters[1][currIter] = calculateG0C0() / countC0;
    iters[2][currIter] = calculateG0C1() / (TOTAL - countC0);

    iters[3][currIter] = calculateB0C0() / countC0;
    iters[4][currIter] = calculateB0C1() / (TOTAL - countC0);

    iters[5][currIter] = calculateE0C0() / countC0;
    iters[6][currIter] = calculateE0C1() / (TOTAL - countC0);

    currIter++;
}

for (var i = 0; i < 7; i++) {
    for (var j = NUM_ITER-3; j < NUM_ITER; j++) {
        console.log(" " + iters[i][j]);
    }
    console.log("\n");
}

function counterPart (num) {
    return 1 - num;
}

function calculateC0() {
    var countC0 = 0;

    //G = 0, B = 0, E = 0
    var numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * iters[3][currIter - 1]
        * iters[5][currIter - 1];
    var denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * iters[4][currIter - 1]
            * iters[6][currIter - 1]);
    countC0 += (numer / denom) * G0B0E0;

    //G = 0, B = 0, E = 1
    numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * iters[3][currIter - 1]
        * counterPart(iters[5][currIter - 1]);
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * iters[4][currIter - 1]
            * counterPart(iters[6][currIter - 1]));
    countC0 += (numer / denom) * G0B0E1;

    //G = 0, B = 1, E = 0
    numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * counterPart(iters[3][currIter - 1])
        * iters[5][currIter - 1];
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * counterPart(iters[4][currIter - 1])
            * iters[6][currIter - 1]);
    countC0 += (numer / denom) * G0B1E0;

    //G = 0, B = 1, E = 1
    numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * counterPart(iters[3][currIter - 1])
        * counterPart(iters[5][currIter - 1]);
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * counterPart(iters[4][currIter - 1])
            * counterPart(iters[6][currIter - 1]));
    countC0 += (numer / denom) * G0B1E1;

    //=================================================
    //G = 1, B = 0, E = 0
    numer = iters[0][currIter - 1]
        * counterPart(iters[1][currIter - 1])
        * iters[3][currIter - 1]
        * iters[5][currIter - 1];
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * counterPart(iters[2][currIter - 1])
            * iters[4][currIter - 1]
            * iters[6][currIter - 1]);
    countC0 += (numer / denom) * G1B0E0;

    //G = 1, B = 0, E = 1
    numer = iters[0][currIter - 1]
        * counterPart(iters[1][currIter - 1])
        * iters[3][currIter - 1]
        * counterPart(iters[5][currIter - 1]);
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * counterPart(iters[2][currIter - 1])
            * iters[4][currIter - 1]
            * counterPart(iters[6][currIter - 1]));
    countC0 += (numer / denom) * G1B0E1;

    //G = 1, B = 1, E = 0
    numer = iters[0][currIter - 1]
        * counterPart(iters[1][currIter - 1])
        * counterPart(iters[3][currIter - 1])
        * iters[5][currIter - 1];
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * counterPart(iters[2][currIter - 1])
            * counterPart(iters[4][currIter - 1])
            * iters[6][currIter - 1]);
    countC0 += (numer / denom) * G1B1E0;

    //G = 1, B = 1, E = 1
    numer = iters[0][currIter - 1]
        * counterPart(iters[1][currIter - 1])
        * counterPart(iters[3][currIter - 1])
        * counterPart(iters[5][currIter - 1]);
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * counterPart(iters[2][currIter - 1])
            * counterPart(iters[4][currIter - 1])
            * counterPart(iters[6][currIter - 1]));
    countC0 += (numer / denom) * G1B1E1;

    return countC0;
}

function calculateG0C0() {
    var countG0C0 = 0;

    //G = 0, B = 0, E = 0
    var numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * iters[3][currIter - 1]
        * iters[5][currIter - 1];
    var denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * iters[4][currIter - 1]
            * iters[6][currIter - 1]);
    countG0C0 += (numer / denom) * G0B0E0;

    //G = 0, B = 0, E = 1
    numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * iters[3][currIter - 1]
        * counterPart(iters[5][currIter - 1]);
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * iters[4][currIter - 1]
            * counterPart(iters[6][currIter - 1]));
    countG0C0 += (numer / denom) * G0B0E1;

    //G = 0, B = 1, E = 0
    numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * counterPart(iters[3][currIter - 1])
        * iters[5][currIter - 1];
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * counterPart(iters[4][currIter - 1])
            * iters[6][currIter - 1]);
    countG0C0 += (numer / denom) * G0B1E0;

    //G = 0, B = 1, E = 1
    numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * counterPart(iters[3][currIter - 1])
        * counterPart(iters[5][currIter - 1]);
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * counterPart(iters[4][currIter - 1])
            * counterPart(iters[6][currIter - 1]));
    countG0C0 += (numer / denom) * G0B1E1;

    return countG0C0;
}

function calculateG0C1() {
    var countG0C1 = 0;

    //G = 0, B = 0, E = 0
    var numer = counterPart(iters[0][currIter - 1])
        * iters[2][currIter - 1]
        * iters[4][currIter - 1]
        * iters[6][currIter - 1];
    var denom = numer
        + (iters[0][currIter - 1]
            * iters[1][currIter - 1]
            * iters[3][currIter - 1]
            * iters[5][currIter - 1]);
    countG0C1 += (numer / denom) * G0B0E0;

    //G = 0, B = 0, E = 1
    numer = counterPart(iters[0][currIter - 1])
        * iters[2][currIter - 1]
        * iters[4][currIter - 1]
        * counterPart(iters[6][currIter - 1]);
    denom = numer
        + (iters[0][currIter - 1]
            * iters[1][currIter - 1]
            * iters[3][currIter - 1]
            * counterPart(iters[5][currIter - 1]));
    countG0C1 += (numer / denom) * G0B0E1;

    //G = 0, B = 1, E = 0
    numer = counterPart(iters[0][currIter - 1])
        * iters[2][currIter - 1]
        * counterPart(iters[4][currIter - 1])
        * iters[6][currIter - 1];
    denom = numer
        + (iters[0][currIter - 1]
            * iters[1][currIter - 1]
            * counterPart(iters[3][currIter - 1])
            * iters[5][currIter - 1]);
    countG0C1 += (numer / denom) * G0B1E0;

    //G = 0, B = 1, E = 1
    numer = counterPart(iters[0][currIter - 1])
        * iters[2][currIter - 1]
        * counterPart(iters[4][currIter - 1])
        * counterPart(iters[6][currIter - 1]);
    denom = numer
        + (iters[0][currIter - 1]
            * iters[1][currIter - 1]
            * counterPart(iters[3][currIter - 1])
            * counterPart(iters[5][currIter - 1]));
    countG0C1 += (numer / denom) * G0B1E1;

    return countG0C1;
}

function calculateB0C0() {
    var countB0C0 = 0;

    //G = 0, B = 0, E = 0
    var numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * iters[3][currIter - 1]
        * iters[5][currIter - 1];
    var denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * iters[4][currIter - 1]
            * iters[6][currIter - 1]);
    countB0C0 += (numer / denom) * G0B0E0;

    //G = 0, B = 0, E = 1
    numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * iters[3][currIter - 1]
        * counterPart(iters[5][currIter - 1]);
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * iters[4][currIter - 1]
            * counterPart(iters[6][currIter - 1]));
    countB0C0 += (numer / denom) * G0B0E1;

    //G = 1, B = 0, E = 0
    numer = iters[0][currIter - 1]
        * counterPart(iters[1][currIter - 1])
        * iters[3][currIter - 1]
        * iters[5][currIter - 1];
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * counterPart(iters[2][currIter - 1])
            * iters[4][currIter - 1]
            * iters[6][currIter - 1]);
    countB0C0 += (numer / denom) * G1B0E0;

    //G = 1, B = 0, E = 1
    numer = iters[0][currIter - 1]
        * counterPart(iters[1][currIter - 1])
        * iters[3][currIter - 1]
        * counterPart(iters[5][currIter - 1]);
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * counterPart(iters[2][currIter - 1])
            * iters[4][currIter - 1]
            * counterPart(iters[6][currIter - 1]));
    countB0C0 += (numer / denom) * G1B0E1;

    return countB0C0;
}

function calculateB0C1() {
    var countB0C1 = 0;

    //G = 0, B = 0, E = 0
    var numer = counterPart(iters[0][currIter - 1])
        * iters[2][currIter - 1]
        * iters[4][currIter - 1]
        * iters[6][currIter - 1];
    var denom = numer
        + (iters[0][currIter - 1]
            * iters[1][currIter - 1]
            * iters[3][currIter - 1]
            * iters[5][currIter - 1]);
    countB0C1 += (numer / denom) * G0B0E0;

    //G = 0, B = 0, E = 1
    numer = counterPart(iters[0][currIter - 1])
        * iters[2][currIter - 1]
        * iters[4][currIter - 1]
        * counterPart(iters[6][currIter - 1]);
    denom = numer
        + (iters[0][currIter - 1]
            * iters[1][currIter - 1]
            * iters[3][currIter - 1]
            * counterPart(iters[5][currIter - 1]));
    countB0C1 += (numer / denom) * G0B0E1;

    //G = 1, B = 0, E = 0
    numer = counterPart(iters[0][currIter - 1])
        * counterPart(iters[2][currIter - 1])
        * iters[4][currIter - 1]
        * iters[6][currIter - 1];
    denom = numer
        + (iters[0][currIter - 1]
            * counterPart(iters[1][currIter - 1])
            * iters[3][currIter - 1]
            * iters[5][currIter - 1]);
    countB0C1 += (numer / denom) * G1B0E0;

    //G = 1, B = 0, E = 1
    numer = counterPart(iters[0][currIter - 1])
        * counterPart(iters[2][currIter - 1])
        * iters[4][currIter - 1]
        * counterPart(iters[6][currIter - 1]);
    denom = numer
        + (iters[0][currIter - 1]
            * counterPart(iters[1][currIter - 1])
            * iters[3][currIter - 1]
            * counterPart(iters[5][currIter - 1]));
    countB0C1 += (numer / denom) * G1B0E1;

    return countB0C1;
}

function calculateE0C0() {
    var countE0C0 = 0;

    //G = 0, B = 0, E = 0
    var numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * iters[3][currIter - 1]
        * iters[5][currIter - 1];
    var denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * iters[4][currIter - 1]
            * iters[6][currIter - 1]);
    countE0C0 += (numer / denom) * G0B0E0;

    //G = 0, B = 1, E = 0
    numer = iters[0][currIter - 1]
        * iters[1][currIter - 1]
        * counterPart(iters[3][currIter - 1])
        * iters[5][currIter - 1];
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * iters[2][currIter - 1]
            * counterPart(iters[4][currIter - 1])
            * iters[6][currIter - 1]);
    countE0C0 += (numer / denom) * G0B1E0;

    //G = 1, B = 0, E = 0
    numer = iters[0][currIter - 1]
        * counterPart(iters[1][currIter - 1])
        * iters[3][currIter - 1]
        * iters[5][currIter - 1];
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * counterPart(iters[2][currIter - 1])
            * iters[4][currIter - 1]
            * iters[6][currIter - 1]);
    countE0C0 += (numer / denom) * G1B0E0;

    //G = 1, B = 1, E = 0
    numer = iters[0][currIter - 1]
        * counterPart(iters[1][currIter - 1])
        * counterPart(iters[3][currIter - 1])
        * iters[5][currIter - 1];
    denom = numer
        + (counterPart(iters[0][currIter - 1])
            * counterPart(iters[2][currIter - 1])
            * counterPart(iters[4][currIter - 1])
            * iters[6][currIter - 1]);
    countE0C0 += (numer / denom) * G1B1E0;

    return  countE0C0;
}

function calculateE0C1() {
    var countE0C1 = 0;

    //G = 0, B = 0, E = 0
    var numer = counterPart(iters[0][currIter - 1])
        * iters[2][currIter - 1]
        * iters[4][currIter - 1]
        * iters[6][currIter - 1];
    var denom = numer
        + (iters[0][currIter - 1]
            * iters[1][currIter - 1]
            * iters[3][currIter - 1]
            * iters[5][currIter - 1]);
    countE0C1 += (numer / denom) * G0B0E0;

    //G = 0, B = 1, E = 0
    numer = counterPart(iters[0][currIter - 1])
        * iters[2][currIter - 1]
        * counterPart(iters[4][currIter - 1])
        * iters[6][currIter - 1];
    denom = numer
        + (iters[0][currIter - 1]
            * iters[1][currIter - 1]
            * counterPart(iters[3][currIter - 1])
            * iters[5][currIter - 1]);
    countE0C1 += (numer / denom) * G0B1E0;

    //G = 1, B = 0, E = 0
    numer = counterPart(iters[0][currIter - 1])
        * counterPart(iters[2][currIter - 1])
        * iters[4][currIter - 1]
        * iters[6][currIter - 1];
    denom = numer
        + (iters[0][currIter - 1]
            * counterPart(iters[1][currIter - 1])
            * iters[3][currIter - 1]
            * iters[5][currIter - 1]);
    countE0C1 += (numer / denom) * G1B0E0;

    //G = 1, B = 1, E = 0
    numer = counterPart(iters[0][currIter - 1])
        * counterPart(iters[2][currIter - 1])
        * counterPart(iters[4][currIter - 1])
        * iters[6][currIter - 1];
    denom = numer
        + (iters[0][currIter - 1]
            * counterPart(iters[1][currIter - 1])
            * counterPart(iters[3][currIter - 1])
            * iters[5][currIter - 1]);
    countE0C1 += (numer / denom) * G1B1E0;

    return  countE0C1;
}
