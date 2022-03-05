const directionParameter = ["asc","desc"];
const sortParameter = ["id","reads","likes","popularity"]

const _ = require('lodash');


exports.getTags = (tags)=>{
    const tokens = tags.split(",");
    for (let i = 0; i < tokens.length; i++) {
        tokens[i] = tokens[i].trim();
    }
    return tokens;
}

exports.addNewPosts = (oldPosts, newPosts) => {
    for (let i = 0; i < newPosts.length; i++) {
        isAlreadyAvailable = false;
        for (let j = 0; j < oldPosts.length; j++) {
            if (_.isEqual(oldPosts[j], newPosts[i])) {
                isAlreadyAvailable = true;
                break;
            }
        }
        if (!isAlreadyAvailable) {
            oldPosts.push(newPosts[i]);
        }
    }
    return oldPosts;
}


exports.verifyDirection = (dir) => {
    for(let data of directionParameter){
        console.log(data)
        if(data === dir) return true;
    }
    return false;
}

exports.verifySorting = async (sort) => {
    for(let data of sortParameter){
        console.log(data)
        if(data === sort) return true;
    }
    return false;
}