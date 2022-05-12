

function solution(S = '') {
    const charArr = S.split('')
    const filteredChars = charArr.filter ( (c,i,_arr) => {
        if (i - 2 < 0) return true
        if (charArr[i-1] == c && charArr[i-2] == c) return false
        return true
    } )
    return filteredChars.join('')
    
}
console.log(solution('eedaaad'));
console.log(solution('xxxtxxx'));
console.log(solution('uuuuxaaaaxuuu'));