module.exports = function (wordArray) {

    let dictionary = new Object();

    for (let x = 0; x < wordArray.length; x++) {
        if (dictionary[wordArray[x]] === undefined) {
            dictionary[wordArray[x]] = 1;
        }
        else {
            dictionary[wordArray[x]]++;
        }
    }

    return dictionary;
}