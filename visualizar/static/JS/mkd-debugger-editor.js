var mapState = []; //h,w

function getTab() {
    let target = document.getElementsByName('cp_tab');
    for (let i of target) {
        if (i.checked) {
            return Number(i.value);
        }

    }
    return Number(target.cp_tab.value);
}

function drawRect(tab, x, y) {
    let canvas = document.getElementById('map' + tab);
    let rect = canvas.getContext('2d');
    rect.beginPath();
    rect.lineWidth = 1;
    rect.strokeStyle = 'black';
    rect.strokeRect(x * 30, y * 30, 29, 29)
}

function clearRect(tab, x, y) {
    let ctx = document.getElementById('map' + tab).getContext('2d')
    ctx.clearRect(x * 30, y * 30, 30, 30)
}

function drawCircle(tab, x, y) {
    let canvas = document.getElementById('map' + tab);
    let circle = canvas.getContext('2d');
    circle.beginPath();
    circle.arc(x * 30 + 15, y * 30 + 15, 7, 0, 360 * Math.PI / 180, 1);
    circle.lineWidth = 2;
    circle.strokeStyle = "orange";
    circle.fillStyle = "orange";
    circle.fill();
    circle.stroke();
}

function drawBlock(tab, x, y) {
    let canvas = document.getElementById('map' + tab);
    let rect = canvas.getContext('2d');
    rect.beginPath();
    rect.fillStyle = 'black';
    rect.fillRect(x * 30, y * 30, 29, 29)
}
let playerImage = new Image();
playerImage.src = 'static/picture/chu.png'

function drawPlayer(tab, x, y) {
    let ctx = document.getElementById('map' + tab).getContext('2d');
    let centerX = x * 30 + 15,
        centerY = y * 30 + 15;
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.drawImage(playerImage, -15, -15, 30, 30);
    ctx.restore();
}

function createMap(tab) {
    $.get("data/map/" + tab + ".txt", data => {
        let map = data.split(/\r|\n/);
        for (let i in map) {
            map[i] = map[i].split('');
        }
        now_width.push(map.length);
        now_height.push(map[0].length);
        document.getElementById('h' + tab).value = map[0].length;
        document.getElementById('w' + tab).value = map.length;
        for (let j in map) {
            for (let k in map[j]) {
                clearRect(tab, j, k);
                drawRect(tab, j, k);
                if (map[j][k] == 's') {
                    drawPlayer(tab, j, k);
                }
                if (map[j][k] == 'o') {
                    drawCircle(tab, j, k);
                }
                if (map[j][k] == 'x') {
                    drawBlock(tab, j, k);
                }
            }
        }
        if (mapState.length >= tab) {
            mapState[tab - 1] = map;
        } else {
            mapState.push(map);
        }
    });
}

function redrawMap() {
    let tab = getTab(),
        map = [];
    let height = Number(document.getElementById('h' + tab).value);
    let width = Number(document.getElementById('w' + tab).value);
    for (let i = 0; i < now_width[tab - 1]; ++i) {
        for (let j = 0; j < now_height[tab - 1]; ++j) {
            clearRect(tab, i, j);
        }
    }
    now_height[tab - 1] = height;
    now_width[tab - 1] = width;
    for (let i = 0; i < width; ++i) {
        map.push([])
        for (let j = 0; j < height; ++j) {
            map[i].push('.');
            drawRect(tab, i, j);
        }
    }
    mapState[tab - 1] = map;
}


function updateMap(tab, x, y) {
    state = mapState[tab - 1][x][y];

    switch (state) {
        case 'o':
            mapState[tab - 1][x][y] = 's';
            clearRect(tab, x, y);
            drawRect(tab, x, y);
            drawPlayer(tab, x, y);
            break;
        case "s":
            mapState[tab - 1][x][y] = '.';
            clearRect(tab, x, y);
            drawRect(tab, x, y);
            break;
        case '.':
            mapState[tab - 1][x][y] = 'x';
            drawBlock(tab, x, y);
            break;
        case 'x':
            mapState[tab - 1][x][y] = 'o';
            clearRect(tab, x, y);
            drawRect(tab, x, y);
            drawCircle(tab, x, y);
            break;
        default:
            break;
    }
}
let now_height = [],
    now_width = [];
$(document).ready(() => {
    for (let i = 1; i <= 3; ++i)
        createMap(i),
        setClick(i);
})

function setClick(tab) {
    let canvas = document.getElementById('map' + tab);

    function click(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left,
            y = e.clientY - rect.top;
        let h = -1,
            w = -1;
        for (let i = 0; i < now_width[tab - 1]; ++i) {
            for (let j = 0; j < now_height[tab - 1]; ++j) {
                if (30 * i <= x && x <= 30 * (i + 1) && 30 * j <= y && y <= 30 * (j + 1)) {
                    w = i;
                    h = j;
                }
            }
        }
        if (h != -1) {
            updateMap(tab, w, h)
        }

    }
    canvas.addEventListener('click', click, false);
}

function generate() {
    str = ""
    ct = 0, end = mapState[getTab() - 1].length
    for (i of mapState[getTab() - 1]) {
        str += i.join('');
        if (ct < end - 1) {
            ++ct
            str += '\n'
        }
    }
    console.log(str);

    document.getElementById('mapCode' + getTab()).value = str;
}