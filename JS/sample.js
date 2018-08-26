var n=10;//移動する値
var n2=100;//dbl移動
var base_top=$("#chu").css("top");
var base_left=$("#chu").css("left");
var old;//変更前の値
$(".textbox").val(n);
$(".textbox2").val(n2);
$(function(){
    $("#up").click(function(){
        $("#chu").css("top","-="+n);
    })
    $("#up").dblclick(function(){
        $("#chu").css("top","-="+n2);
    })
    $("#down").click(function(){
        $("#chu").css("top","+="+n);
    })
    $("#down").dblclick(function(){
        $("#chu").css("top","+="+n2);
    })
    $("#left").click(function(){
        $("#chu").css("left","-="+n);
        $("#chu").css("transform","scale(1,1)")
    })
    $("#left").dblclick(function(){
        $("#chu").css("left","-="+n2);
        $("#chu").css("transform","scale(1,1)")
    })
    $("#right").click(function(){
        $("#chu").css("left","+="+n);
        $("#chu").css("transform","scale(-1,1)")        
    })
    $("#right").dblclick(function(){
        $("#chu").css("left","+="+n2);
        $("#chu").css("transform","scale(-1,1)")        
    })
    $("#reset").click(function(){
        if(!confirm('本当にリセットしますか？')){
            /* キャンセルの時の処理 */
            return false;
        }else{
            /*　OKの時の処理 */
        $("#chu").css("left",base_left);
        $("#chu").css("top",base_top);
        $("#chu").css("transform","scale(1,1)");
        }
    })
    $(".textbox").click(function(){
        old=$(this).val();
    })
    $(".enter").click(function(){
        var num=$(".textbox").val();
        var flag=$.isNumeric(num);
        if(flag){
            n=num;
            $(".textbox").val(num);
        }
        else {
            alert("Please input numbers");
            $(".textbox").val(old);            
        }
    })
    $(".textbox2").click(function(){
        old=$(this).val();
    })
    $(".enter2").click(function(){
        var num=$(".textbox2").val();
        var flag=$.isNumeric(num);
        if(flag){
            n2=num;
            $(".textbox2").val(num);
        }
        else {
            alert("Please input numbers");
            $(".textbox2").val(old);            
        }
    })
});