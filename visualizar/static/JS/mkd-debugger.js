function expansion(str)
{
    //console.log('dfs',str);
    let result = '';
    let comands = ['s', 'r', 'l']
    let stack = '';     
    for (let i = 0; i < str.length;++i) {
        if (str[i] == '(') {
            let ct = 1;
            let str_sub = ''
            for (let j = i + 1; j < str.length; ++j){
                if (str[j] == '(')++ct;
                if (str[j] == ')')--ct;
                if (str[j] == ')' && !ct) {
                    stack = expansion(str_sub);
                    result += stack;
                    i = j;
                    break;
                }
                str_sub += str[j];
            }
        }
        if (str[i] == '[') {
            let str_sub = '';
            let ct = 1;
            for (let j = i + 1; j < str.length; ++j){
                if (str[j] == '[')++ct;
                if (str[j] == ']')--ct;
                if (str[j] == ']'&&!ct) {
                    stack = reverse(str_sub);
                    result += stack;
                    i = j;
                    break;
                }
                str_sub += str[j];
            }
        }
        if (!isNaN(str[i])) {
            result += stack.repeat(Number(str[i]) - 1);
        }
        for (let j of comands) {
            if (str[i] == j) {
                stack = j;
                result += j;
            }
        }
    }
    //console.log('dfs-res',result);
    return result
}
function reverse(str)
{
    //console.log('rev', str);
    result = expansion(str);
    //console.log('rev-res', result);
    return result + reverseString(result);
}
function reverseString(str) {
    return str.split("").reverse().join("");
}
let nowIndex = 0, maxIndex,speed;
function startCodeRun()
{
    code = document.getElementById('code').value;
    expandedCode = expansion(code);
    document.getElementById('expanded_code').textContent=null;
    for (let i in expandedCode) {
        let span = document.createElement('span');
        span.textContent = expandedCode[i];
        span.id='index_' + i;
        document.getElementById('expanded_code').appendChild(span);
    }
    maxIndex = expandedCode.length;
    document.getElementById('max_index').textContent = maxIndex;
    nowIndex = 0;
    speed = document.getElementById('speed').value;
    setTimeout(() => {
        setInterval(() =>
        {
            codeRun();
        }, 250/Number(speed));
    }, 200);
}
function codeRun()
{
    if (nowIndex >= maxIndex) return;
    document.getElementById('index_' + nowIndex).style.color = 'black';
    if (document.getElementById('index_' + nowIndex)){
        ++nowIndex;
        document.getElementById('index_' + nowIndex).style.color = 'red';
        document.getElementById('now_index').textContent = nowIndex+1;
        //console.log(nowIndex);
    }
}
let map;
function createMap()
{
    $.getJSON('data/map/1.json', (data) =>
    {
        map = data;
        console.log(map);
    }
    )
}
$(document).ready(() =>
{
    createMap();
})