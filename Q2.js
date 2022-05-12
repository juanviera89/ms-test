const translate1to2 = (blocksMap = []) => blocksMap.reduce((resMap, line, i) => [...resMap, line.split('')], [])

console.log(translate1to2(['A...<', 'X..vX', 'X.>X.']))

const translateSight2Obstacle = (blocksMap) => {
    const _arr = [...blocksMap]
    for (let i = 0; i < _arr.length; i++) {
        for (let j = 0; j < _arr[i].length; j++) {
            switch (_arr[i][j]) {
                case '<':

                    break;

                case '>':

                    break;

                case 'v':

                    break;

                case '^':

                    break;

                default:
                    break;
            }
        }

    }
}