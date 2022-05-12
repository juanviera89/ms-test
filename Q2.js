const translate1to2 = (blocksMap = []) => blocksMap.reduce((resMap, line, i) => [...resMap, line.split('')], [])

//console.log(translate1to2(['A...<', 'X..vX', 'X.>X.']))
const sightObstacles = ['v', '<', '>', '^', 'X']

const translateSight2Obstacle = (blocksMap) => {
    const _arr = [...blocksMap]
    for (let i = 0; i < _arr.length; i++) {
        for (let j = 0; j < _arr[i].length; j++) {
            switch (_arr[i][j]) {
                case '<':
                    for (let n = j - 1; n >= 0; n--) {
                        if (sightObstacles.includes(_arr[i][n])) break
                        _arr[i][n] = '*'
                    }
                    break;

                case '>':
                    for (let n = j + 1; n < _arr[i].length; n++) {
                        if (sightObstacles.includes(_arr[i][n])) break
                        _arr[i][n] = '*'
                    }
                    break;

                case 'v':
                    for (let n = i + 1; n < _arr.length; n++) {
                        if (sightObstacles.includes(_arr[n][j])) break
                        _arr[n][j] = '*'
                    }
                    break;

                case '^':

                    for (let n = i - 1; n >= 0; n--) {
                        if (sightObstacles.includes(_arr[n][j])) break
                        _arr[n][j] = '*'
                    }
                    break;

                default:
                    break;
            }
        }

    }
    return _arr.map((row) => row.map(pos => [...sightObstacles, '*'].includes(pos) ? 'X' : pos))
}


//console.log(translateSight2Obstacle(translate1to2(['A...<', 'X..vX', 'X.>X.'])))

const findAssasin = (blocksMap = []) => {
    let posi = -1, posj = -1, i = 0, j = 0;

    while (posj < 0 && i < blocksMap.length) {
        while (posj < 0 && j < blocksMap[i].length) {
            //console.log (i,j,blocksMap.length,blocksMap[i].length, blocksMap[i][j])
            if (blocksMap[i][j] == 'A') [posi, posj] = [i, j]
            j++
        }
        i++
        j = 0
    }
    return [posi, posj]
}
/* console.log(translate1to2(['...Xv', 'AX..^', '.XX..']));
console.log(translateSight2Obstacle(translate1to2(['...Xv', 'AX..^', '.XX..'])));
console.log(findAssasin(translate1to2(['>...<', 'XA.vX', 'X.>X.']))) */

const findNextMove = (obstacleMap = [], i = 0, j = 0, prevmovs = []) => {
    const moveLists = [...prevmovs], nextMoves = [];
    const moves = [
        [i, j - 1],
        [i, j + 1],
        [i - 1, j],
        [i + 1, j]
    ]
    for (let k = 0; k < moves.length; k++) {
        //console.log(k,moves[k]);
        const ii = moves[k][0], jj = moves[k][1];
        //console.log('trying to move to', ii, jj, obstacleMap[ii] ? obstacleMap[ii][jj] : undefined);
        if (!moveLists.includes(`${ii}${jj}`) && obstacleMap[ii] && obstacleMap[ii][jj] && obstacleMap[ii][jj] != 'X') {
            //console.log('can move');
            nextMoves.push([ii, jj])
        } else {
            //console.log('cant move');
        }

    }
    return nextMoves
}

const isBlocked = (blocksMap) => {
    const obstaclesMap = translateSight2Obstacle(blocksMap);
    const [ai, aj] = findAssasin(blocksMap);
    let prevmovs = [[ai, aj].join('')], nextMoves = [[ai, aj]];
    const goal = `${obstaclesMap.length -1}${obstaclesMap[obstaclesMap.length - 1].length -1}`
    do {
        const _initialPos = [...nextMoves];
        nextMoves = []
        for (let i = 0; i < _initialPos.length; i++) {
            const _nextMoves = findNextMove(obstaclesMap, _initialPos[i][0], _initialPos[i][1], prevmovs)
            //console.log(`Next moves from ${_initialPos[i]}`, _nextMoves);
            nextMoves = [...nextMoves, ..._nextMoves]
        }
        prevmovs = [...prevmovs, ...nextMoves.map(m => m.join(''))]
    } while (!prevmovs.includes(goal) && nextMoves.length);
    //console.log(goal, prevmovs);
    return !prevmovs.includes(goal) || obstaclesMap[ai,aj] == 'X'

}
/* console.log('#######################################################');
console.log((translate1to2(['...Xv', 'AX..^', '.XX..'])))
console.log(isBlocked(translate1to2(['...Xv', 'AX..^', '.XX..'])))

console.log('#######################################################');
console.log((translate1to2(['A...<', 'X..vX', 'X.>X.'])))
console.log(isBlocked(translate1to2(['A...<', 'X..vX', 'X.>X.']))) */

function solution (b) {
    const map = translate1to2(b)
    const canSneak = !isBlocked(map)
    return canSneak
}

console.log(solution(['X.....>', '..v..X.', '.>..X..','A......']));
console.log(solution(['...Xv', 'AX..^', '.XX..']));
console.log(solution(['...', '>.A']));