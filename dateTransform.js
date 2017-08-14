var dateTransform = (function($) {
    //轉換時間
    var toTime = function(_timer) {
        var _date = new Date(); //宣告時間變數來轉換
        _date.setTime(_timer); //塞入紀錄的時間
        return _date;
    }
    return {
        toTime: toTime
    }
    
})(jQuery)
