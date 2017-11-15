//Tyler: This module exports a generic id Generator.

let idGenerator = function*(from){
    let id = 1
    while(true){
        yield from + id
        id++
    }
}

module.exports = idGenerator