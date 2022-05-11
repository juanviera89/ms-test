const distance = (j,k) => {
    if( isNaN(j) || isNaN(k) ) throw new Error('params must be numbers')
    if (k > j) throw new Error('k cant be greater than j');

    return k - j + 1
}

const maxJump = (blocks = [], initial = 0, inverse = false) => {

    const jumpIndex = (inverse ? [...blocks].reverse() : blocks).findIndex( (block,i,_arr) => _arr.length = i+1 || block > _arr[i+1] )
    return inverse ? blocks.length - jumpIndex +1 : jumpIndex ;

}

function solution(blocks = []) {
    const distances =  blocks.map ( (block,j, _arr) => {
        const j = maxJump(blocks,j,true), k = maxJump(blocks,j)
        const _distance = distance(j,k);
    } )
    const {pos,maxDistance} = distances.reduce( ( _res, dis, j) => {
        if ( dis > _res.maxDistance) return {pos : j,maxDistance : dis}
        return _res
    }, {pos : 0,maxDistance : 0} )
    console.log(pos,distance)
    return maxDistance
}

console.log(solution([2,6,8,5]))
console.log(solution([1,5,5,2,6]))
console.log(solution([1,1]))


// [ 0 1 2 3 4 5 6 7 8] = 9
// [ 8 7 6 5 4 3 2 1 0]