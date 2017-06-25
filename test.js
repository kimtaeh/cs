var mecab = require('mecab-ya');

var text = '주문번호는 어디서 확인 하나요';


mecab.nouns(text, function (err, result) {
    
    var t1 = result[0];
    
    console.log(result);
    /*
        [ '아버지', '방' ]
    */
    
    
});
