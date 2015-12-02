$(function () {
    var obj = document.querySelectorAll(".baidu_ex .main li div.flip div.front");       //只监听front的动画回调。否则每次动画会有两次回调
    var endStatus = new Array($(obj).parents("div.flip").length);      //最终状态：back/front
    var endStatus_count = 0;            //每次动画会监听到两个回调，此变量为计数器
    for (i = 0; i < endStatus.length; i++) {
        //监听
        try {       //防止低版本IE报错
            obj[i].addEventListener("webkitAnimationEnd", function () {
                flipFinished($(this).parents("div.flip"));
            });
            obj[i].addEventListener("animationend", function () {
                flipFinished($(this).parents("div.flip"));
            });
        }
        catch (e) { }
    }


    function flipFinished(obj) {        //翻转完成的回调。obj:$("li div.flip");
        var n = $(obj).parents("li").index();
        if ($(obj).hasClass("queue") && !$(obj).hasClass("to_" + endStatus[n])) {         //有排队翻转任务且当前状态非计划最终状态，执行排队任务
            $(obj).removeClass("queue");
            if ($(obj).hasClass("to_back")) {
                $(obj).removeClass("to_back");
                flipLi($(obj), "front");
            }
            else {
                $(obj).removeClass("to_front");
                flipLi($(obj), "back");
            }
        }
        else {          //完成翻转任务
            /*
            if ($(obj).hasClass("to_back"))
                $(obj).css("transform", "rotateY(-180deg)");
            else if ($(obj).hasClass("to_front"))
                $(obj).css("transform", "rotateY(0)");
            */
            $(obj).removeAttr("class").addClass("flip");
        }
    }

    //执行翻转方法。direction:back/front;obj:$("li div.flip");
    function flipLi(obj, direction) {
        var n = $(obj).parents("li").index();
        endStatus[n] = direction;
        if ($(obj).hasClass("queue"))
            return;
        else if (($(obj).hasClass("to_front") && direction == "back") || ($(obj).hasClass("to_back") && direction == "front"))
            $(obj).addClass("queue");
        else if (direction == "back") {
            $(obj).removeClass("to_front").addClass("to_back");
            $(obj).find(".front").removeClass("show").addClass("hide");
            $(obj).find(".back").removeClass("hide").addClass("show");
        }
        else if (direction == "front") {
            $(obj).removeClass("to_back").addClass("to_front");
            $(obj).find(".back").removeClass("show").addClass("hide");
            $(obj).find(".front").removeClass("hide").addClass("show");
        }
    }

    //监听翻转场景的悬停事件
    $(".baidu_ex .main li").hover(function () {
        flipLi($(this).find("div.flip"), "back");
    }, function () {
        flipLi($(this).find("div.flip"), "front");
    });

    function show(p, append) {
        if (append)
            $(".Mixins").html($(".Mixins").html() + "<br />" + p);
        else
            $(".Mixins").html(p);
    }
});
