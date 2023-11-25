var cos = 0.5,
    sin = Math.sqrt(3) / 2,
    deg = Math.PI / 180;
    canv, ctx;

function rebro(n, len) {
    ctx.save();                // Зберігаєм поточну трансформацію
    if (n == 0) {            
        ctx.lineTo(len, 0);
    }
    else {
        ctx.scale(1 / 3, 1 / 3);        
        rebro(n-1, len);                //рекурсія на ребрі
        ctx.rotate(60 * deg);
        rebro(n-1, len);
        ctx.rotate(-120 * deg);
        rebro(n-1, len);
        ctx.rotate(60 * deg);
        rebro(n-1, len);
    }
    ctx.restore();            
    ctx.translate(len, 0);    
}

function drawKochSnowflake(x, y, len, n) {
    x = x - len / 2;
    y = y + len / 2 * Math.sqrt(3)/3;
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0, 0);
    rebro(n, len);    ctx.rotate(-120 * deg);     //рекуррсія в трикутник
    rebro(n, len);    ctx.rotate(-120 * deg);
    rebro(n, len);    ctx.closePath();
    ctx.strokeStyle = "#000";
    ctx.stroke();
    ctx.restore();
}

function clearcanvas(){                    //чистим канвас
ctx.save();
ctx.beginPath();

ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.clearRect(0, 0, canvas1.width, canvas1.height);

ctx.restore();
}

function run() {
    canv = document.getElementById('canvas1');
    ctx = canv.getContext('2d');
    var numberiter = document.getElementById("qty").value;
    drawKochSnowflake(canv.width/2, canv.height/2, 380, numberiter);
    
    ctx.stroke();       
}
