var mecab = require('mecab-ya');

var text = '아버지가방에들어가신다';

mecab.nouns(text, function (err, result) {
    
    var t1 = result[0];
    
    console.log(t1);
    /*
        [ '아버지', '방' ]
    */
    
    
});
