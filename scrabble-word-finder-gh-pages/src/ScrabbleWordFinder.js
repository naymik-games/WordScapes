var letterInput = document.getElementById('letters');
var foundWords = document.getElementById('words');

var findWords = function () {
  //get all word combinations in array
  var words = ScrabbleWordFinder.find(letterInput.value.toLowerCase());
  //filter out 2 letter words
  var wordCombosClean1 = words.filter(function (item) {
    return item.length > 2;
  });
  console.log(wordCombosClean1)
  //print, changing array to list
  foundWords.innerHTML = wordCombosClean1.join('\n');
};

var ScrabbleWordFinder = (() => {
  var ScrabbleWordFinder = function () {
    this.dict = new ScrabbleDictionary(ScrabbleWordList);
  };

  ScrabbleWordFinder.prototype.find = function (letters) {
    return validWords(this.dict.root, letters);
  };

  var validWords = function (node, letters, word = '', results = []) {
    if (node.isWord) {
      results.push(word);
    }
    var seen = new Set();
    for (let ch of letters) {
      if (!seen.has(ch)) {
        seen.add(ch);
        if (node.children[ch]) {
          validWords(node.children[ch], letters.replace(ch, ''), word + ch, results);
        }
      }
    }

    return results;
  };

  var ScrabbleDictionary = function (words) {
    this.root = new ScrabbleTrieNode();
    words.forEach(word => this.insert(word));
  };

  var ScrabbleTrieNode = function () {
    this.children = Object.create(null);
  };

  ScrabbleDictionary.prototype.insert = function (word) {
    var cursor = this.root;
    for (let letter of word) {
      if (!cursor.children[letter]) {
        cursor.children[letter] = new ScrabbleTrieNode();
      }
      cursor = cursor.children[letter];
    }
    cursor.isWord = true;
  };

  return new ScrabbleWordFinder();
})();


