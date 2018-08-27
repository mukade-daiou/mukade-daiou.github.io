
function make_table(name,json_link,tags){
    $.getJSON(json_link,function(data){
        for(var i in data){
            var str="";
            str+="<tr>";
            for(var tag in tags){
                str+="<td>"+data[i][tags[tag]]+"</td>";
            }
            str+="</tr>";
            $("#"+name).append(str);
        }
    })
}

$(document).ready(function(){
    make_table("table","https://mukade-daiou.github.io/JS/test.json",["name","solved"]);
})