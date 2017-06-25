var mecab = require('mecab-ya');

var text = '아버지가방에들어가신다';

mecab.nouns(text, function (err, result) {
    console.log(result);
    /*
        [ '아버지', '방' ]
    */
});
