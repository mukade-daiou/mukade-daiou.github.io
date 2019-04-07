function expansion(str)
{
    let result = '';
    let comands = ['s', 'r', 'l']
    let stack = '';
    for (let i = 0; i < str.length; ++i) {
        if (str[i] == '(') {
            let ct = 1;
            let str_sub = ''
            for (let j = i + 1; j < str.length; ++j) {
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
            for (let j = i + 1; j < str.length; ++j) {
                if (str[j] == '[')++ct;
                if (str[j] == ']')--ct;
                if (str[j] == ']' && !ct) {
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
    return result
}
function reverse(str)
{
    result = expansion(str);
    return result + reverseString(result);
}
function reverseString(str)
{
    return str.split("").reverse().join("");
}
let nowIndex = 0, maxIndex, speed, timer;
function startCodeRun()
{
    let tab = getTab();
    createMap(tab);
    clearInterval(timer);
    code = document.getElementById('code').value;
    expandedCode = expansion(code);
    document.getElementById('expanded_code').textContent = null;
    for (let i in expandedCode) {
        let span = document.createElement('span');
        span.textContent = expandedCode[i];
        span.id = 'index_' + i;
        document.getElementById('expanded_code').appendChild(span);
        if (i % 100 == 99) {
            let br = document.createElement('br');
            document.getElementById('expanded_code').appendChild(br);
        }
    }
    maxIndex = expandedCode.length;
    document.getElementById('max_index').textContent = maxIndex;
    nowIndex = 0;
    speed = document.getElementById('speed').value;
    setTimeout(() =>
    {
        timer =
            setInterval(() =>
            {
                codeRun(tab);
            }, 250 / Number(speed));
    }, 300);
}
function codeRun(tab)
{
    if (nowIndex == maxIndex) {
        clearInterval(timer);
        if (nowIndex) document.getElementById('index_' + (nowIndex - 1)).style.color = 'black';
        return;
    }
    players[tab - 1].update(document.getElementById('index_' + nowIndex).textContent);
    if (nowIndex) document.getElementById('index_' + (nowIndex - 1)).style.color = 'black';
    if (document.getElementById('index_' + nowIndex)) {
        document.getElementById('index_' + nowIndex).style.color = 'red';
        ++nowIndex;
        document.getElementById('now_index').textContent = nowIndex;
    }
}
var mapState = [];
function getTab()
{
    let target = document.getElementsByName('cp_tab');
    for (let i of target) {
        if (i.checked) {
            return i.value;
        }

    }
    return target.cp_tab.value;
}
function drawRect(tab, x, y)
{
    let canvas = document.getElementById('map' + tab);
    let rect = canvas.getContext('2d');
    rect.lineWidth = 1;
    rect.strokeStyle = 'black';
    rect.strokeRect(x * 30, y * 30, 29, 29)
}
function clearRect(tab, x, y)
{
    let ctx = document.getElementById('map' + tab).getContext('2d')
    ctx.clearRect(x * 30 + 1, y * 30 + 1, 28, 28)
}
function drawCircle(tab, x, y)
{
    let canvas = document.getElementById('map' + tab);
    let circle = canvas.getContext('2d');
    circle.arc(x * 30 + 15, y * 30 + 15, 7, 0, 360 * Math.PI / 180, 1);
    circle.lineWidth = 2;
    circle.strokeStyle = "yellow";
    circle.fillStyle = "yellow";
    circle.fill();
    circle.stroke();
}
function drawBlock(tab, x, y)
{
    let canvas = document.getElementById('map' + tab);
    let rect = canvas.getContext('2d');
    rect.fillStyle = 'black';
    rect.fillRect(x * 30, y * 30, 29, 29)
}
class Player
{
    constructor(tab, x, y)
    {
        this.x = x;
        this.y = y;
        this.arg = 0;
        this.way = [{ "x": 0, "y": -1 }, { "x": 1, "y": 0 }, { "x": 0, "y": 1 }, { "x": -1, "y": 0 }];
        this.tab = tab;
        this.canvas = document.getElementById('map' + tab);
        this.img = new Image();
        this.img.src = 'static/picture/chu.png';
        this.img.onload = () =>
        {
            this.draw();
        }
    }
    draw()
    {
        this.reset();
        this.rotate();
    }
    checkPos(x, y)
    {
        let map = mapState[this.tab - 1];
        return x + 1 && x < map.length && y + 1 && y < map[0].length && map[x][y] != 'x';
    }
    reset()
    {
        clearRect(this.tab, this.x, this.y);
        drawRect(this.tab, this.x, this.y);
    }
    rotate()
    {
        let ctx = this.canvas.getContext('2d');
        let centerX = this.x * 30 + 15, centerY = this.y * 30 + 15;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(this.arg * Math.PI / 180);
        ctx.drawImage(this.img, -15, -15, 30, 30);
        ctx.restore();
    }
    update(command)
    {
        if (command == 's') {
            if (this.checkPos(this.x + this.way[(this.arg % 360) / 90]['x'], this.y + this.way[(this.arg % 360) / 90]['y'])) {
                this.reset();

                this.x += this.way[(this.arg % 360) / 90]['x'];
                this.y += this.way[(this.arg % 360) / 90]['y'];
            }
        }
        if (command == 'r') {
            this.arg += 90;
            this.arg %= 360;
        }
        if (command == 'l') {
            this.arg += 270;
            this.arg %= 360;
        }
        this.draw();
    }
}
function createMap(tab)
{
    let startX = 0, startY = 0;
    $.getJSON('data/map/' + tab + '.json', (data) =>
    {
        let map = data['map'].split(/\r|\n/);
        for (let j in map) {
            for (let k in map[j]) {
                clearRect(tab, j, k);
                drawRect(tab, j, k);
                if (map[j][k] == 's') {
                    startX = Number(j);
                    startY = Number(k);
                }
                if (map[j][k] == 'o') {
                    drawCircle(tab, j, k);
                }
                if (map[j][k] == 'x') {
                    drawBlock(tab, j, k);
                }
            }
        }
        mapState.push(map);
        players.push(new Player(tab, startX, startY));
    }
    )
}
let players = [];
$(document).ready(() =>
{
    for (let i = 1; i <= 3; ++i)
        createMap(i);
})