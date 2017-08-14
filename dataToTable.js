var dataToTable = (function($) {
    var jsonToTable = function(_json, _target) {
        var _json = _json; //設定json
        var _dataLength = Object.keys(_json[0]).length; //資料的長度
        var _table = "." + _target;
        //先建立對應的tr
        for (var i = 0; i <= _json.length; i += 1) {
            $(_table).append("<tr></tr>");
        }
        //塞入對應的Title
        var titleName = $.map(_json[0], function(_value, _key) {
            $("tr:eq(0)", $(_table)).append("<th>" + _key + "</th>");
        })
        //解析資料後倒入
        $.each(_json, function(_num, _value) {
            var jsonToArray = $.map(_json[_num], function(_value, _key) {
                $("tr:eq(" + (_num + 1) + ")", $(_table)).append("<td>" + _value + "</td>");
            })
        })
        // console.log(_table)
    }
    return {
        jsonToTable: jsonToTable
    }
})(jQuery)