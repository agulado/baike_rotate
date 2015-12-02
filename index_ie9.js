$(function () {
    $(".main li div.flip div").bind("mouseover", function () {
        if ($(this).css("display") == "none")
            return;
        $(".main li div").stop(true, true);
        $($(this).parent().find("div.front")).fadeOut(100, function () {
            $($(this).parent().find("div.back")).fadeIn(100);
        });
    });
    $(".main li div.flip div").bind("mouseout", function () {
        if ($(this).css("display") == "none")
            return;
        $(".main li div").stop(true, true);
        $($(this).parent().find("div.back")).fadeOut(100, function () {
            $($(this).parent().find("div.front")).fadeIn(100);
        });
    });
});