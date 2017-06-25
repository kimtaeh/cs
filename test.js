var mecab = require('mecab-ya');

var text = '판매자와 통화하고 싶어요';


mecab.nouns(text, function (err, result) {
    
    var t1 = result[0];
    
    console.log(result);
    /*
        [ '아버지', '방' ]
    */
    
    
});
