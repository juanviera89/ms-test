const distance = (j,k) => {
    if( isNaN(j) || isNaN(k) ) throw new Error('params must be numbers')
    if (k < j) throw new Error('j cant be greater than k');

    return k - j + 1
}

const maxJump = (blocks = [], initial = 0, inverse = false) => {
    console.log('maxJump', blocks, initial, inverse);
    const _arr =  (inverse ? [...blocks].reverse() : blocks).slice( inverse ? blocks.length - 1 - initial : initial, blocks.length)
    // [ 0 1 2 3 4 5 6 7 8] = 9
    // [ 8 7 6 5 4 3 2 1 0]
    // pos inicial : 3 >> inverso : length - pos - 1 = 9 - 3 - 1 = 5
    console.log('// find jump');
    const jumpIndex = _arr.findIndex( (block,i,_arr2) => {
        console.log(block, _arr2[i+1] ,i ,_arr2.length);
        if (_arr2.length <= i+1) return true
        return block > _arr2[i+1] 
    })
    const res = inverse ? initial - jumpIndex : initial + jumpIndex ;
    console.log(jumpIndex,res);
    return res

}

function solution(blocks = []) {
    const distances =  blocks.map ( (block,i, _arr) => {
        const j = maxJump(blocks,i,true), k = maxJump(blocks,i)
        const _distance = distance(j,k);
        return _distance
    } )
    const {pos,maxDistance} = distances.reduce( ( _res, dis, j) => {
        if ( dis > _res.maxDistance) return {pos : j,maxDistance : dis}
        return _res
    }, {pos : 0,maxDistance : 0} )
    console.log(pos,maxDistance)
    return maxDistance
}

console.log(solution([2,6,8,5]))
console.log(solution([1,5,5,2,6]))
console.log(solution([1,1]))


// [ 0 1 2 3 4 5 6 7 8] = 9
// [ 8 7 6 5 4 3 2 1 0]