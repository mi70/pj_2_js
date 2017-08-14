var betting_control = (function($) {
    //建置數字列表
    var createList = function(total, name) {
        var _total = Number(total); //總數
        var _name = "." + name; //ul名字
        /*把數字列表建立起來*/
        for (var i = 0; i < _total; i += 1) {
            var liList = '<li><a href="#">' + (i + 1) + '</a></li>';
            $(_name).append(liList);

        }
    }
    //第一種玩法 會產生一個點選過後的號碼區域
    var game_plural = function(target, activeName, selectedName, inputName, icon, sortBoolean) {
        var _target = "." + target; //目標
        var _activeName = activeName; //執行後的類別
        var _selectedName = selectedName; //放置選取後數字的位置
        var _input = inputName; //input的名字
        var _gobalThis = this; //存入最上層的人
        var _icon = icon; //icon符號
        var _sortBoolean = sortBoolean; //判斷是否要排序
        $(_target).after("<ul class='selected " + _selectedName + "'></ul>"); //建立放置選過後按鈕的位置
        //點擊按鈕
        $("li a", $(_target)).click(function() {
            var isActive = $(this).parent().is("." + _activeName); //判斷是否點過用
            var _nowNumber = $(this).text(); //目前數字
            var _this = $(this);
            if (!isActive) {
                //新增
                $(this).parent().addClass(_activeName); //如果沒被點過設定為點過
                var newList = '<li><a href="#">' + _nowNumber + '</a></li>'; //號碼為
                $("." + _selectedName).prepend(newList); //添加號碼
                _this.data("liNumber", $("li:eq(0)", $("." + _selectedName))); //記錄下這組的li是誰
                $("li:eq(0) a", $("." + _selectedName)).data("touch", _this.parent()); //它的上一層是誰


            } else {
                //移除
                $(this).parent().removeClass(_activeName); //如果沒被點過設定為點過
                $(_this.data("liNumber"), $("." + _selectedName)).remove(); //移除掉這組li
                // console.log(_this.data("liNumber"))
            }
            //是否要排序
            if (_sortBoolean) {
                _gobalThis.liSort(_selectedName); //排序
            }
        
            _gobalThis.countVal(_input, _selectedName, _icon); //計算誰被選
        })
        //點擊被選定區的按鈕
        $("." + _selectedName).on("click", "li a", function() {
            $(this).data("touch").removeClass("active"); //移除類別
            $(this).parent().remove(); //移除li
            _gobalThis.countVal(_input, _selectedName, _icon); //計算誰被選
        })

    }
    //計算選取
    var countVal = function(inputName, who, icon) {
        var _value = ""; //儲存選號值用
        /*計算那些被選到*/
        $("li", $("." + who)).each(function(i, index) {
            var liValue = $("a", $(this)).text();
            /* 判斷需不需要連接的符號 */
            if (i == 0) {
                _value += liValue;
            } else {
                _value += icon + liValue;
            }
        })

        $("." + inputName).val(_value); //塞值到input
    }

    //排序用
    var liSort = function(_ul) {
        //透過sort來排序
        function liSort(a, b) {
            return Number($("a", $(b)).text()) < Number($("a", $(a)).text()) ? 1 : -1;
        }
        $("li", $("." + _ul)).sort(liSort).appendTo($("." + _ul));
    }

    //計算幾柱
    var countHowMany = function(_groupNum, _total) {
        if (_total < _groupNum) {
            //沒湊滿一組時
        } else {
            var topArray = 1; //用來計算排列組合的被除除數
            var bottomArray = _groupNum; //用來計算排列組合的除數
            var totalCount ;    //種柱數
            //計算被除數
            for (var i = _groupNum; i <= _total; i += 1) {
                topArray = topArray * i;
            }
            //計算除數
            for(var j =1;j<=_total-_groupNum;j+=1){
                bottomArray = bottomArray*j;
            }
            totalCount = topArray / bottomArray;
            console.log(totalCount);
        }
    }

    //錯誤訊息
    var errorFunction = function(_call) {
        var errorInfo = _call; //建立callback
        errorInfo(); //回呼callBack
    }
    return {
        createList: createList,
        game_plural: game_plural,
        countVal: countVal,
        liSort: liSort,
        countHowMany: countHowMany,
        errorFunction: errorFunction
    };
})(jQuery)


betting_control.countHowMany(6,40);