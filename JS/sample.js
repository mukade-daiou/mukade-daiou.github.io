var n=10;//移動する値
$(function(){
    $("#up").click(function(){
        $("#chu").css("top","-=10");
    })
    $("#down").click(function(){
        $("#chu").css("top","+=10");
    })
    $("#left").click(function(){
        $("#chu").css("left","-=10");
    })
    $("#right").click(function(){
        $("#chu").css("left","+=10");
    })
});