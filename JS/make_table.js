/*$(document).ready(function(){
    $.getJSON("test.json",function(data){
    for(var i in data){
        alert("name"+data[i].name);
        $("#list").append("<li>"+data[i].name+":"+data[i].solved+"</li>");
    }
});
});*/
$.getJSON("test.json",function(data){
    alert(data.name);
})