var P = 200;

function drawFractal() {
    var scale = parseInt(document.getElementById('scale').value);
    var n_iter = parseInt(document.getElementById('iterations').value);
    var arr = [];
    var selectedFunction = document.getElementById('fractalType').value;
    var colorScheme = document.getElementById('colorScheme').value;

    for (var y = -P; y <= P; y++) {
        for (var x = -P; x <= P; x++) {
            var a = x / scale;
            var b = y / scale;
            var z = math.complex(a, b);
            var n = 0;

            while (n < n_iter) {
                if (selectedFunction === 'tgz') {
                    var PowZ = math.chain(z).multiply(z).done();
                    z = math.tan(PowZ);
                } else if (selectedFunction === 'tgz2') {
                    var PowZ = math.chain(z).multiply(z).done();
                    z = math.tan(PowZ);
                    PowZ = math.chain(z).multiply(z).done();
                    z = math.tan(PowZ);
                }

                var d = Number.parseInt(math.sqrt(math.pow(z.re, 2) + math.pow(z.im, 2)));
                if (math.abs(d) > 1)
                    break;
                n++;
            }

            arr.push(n);
        }
    }

    drawPoints(arr, colorScheme);
}

function drawPoints(arr, colorScheme) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 400;

    var imageData = context.createImageData(2 * P + 1, 2 * P + 1);
    var r, g, b;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == document.getElementById('iterations').value)
            r = g = b = 0;
        else {
            switch (colorScheme) {
                case 'purple-white':
                    r = (arr[i] % 2) * 32 + 128;
                    g = (arr[i] % 4) * 64;
                    b = (arr[i] % 2) * 16 + 128;
                    break;
                case 'green-black':
                    r = (arr[i] % 2) * 16;
                    g = (arr[i] % 4) * 32 + 64;
                    b = (arr[i] % 2) * 8;
                    break;
                case 'salad-brown':
                    r = (arr[i] % 2) * 100 + 20;
                    g = (arr[i] % 4) * 100;
                    b = (arr[i] % 2) * 50 + 10;
                    break;
                default:
                    r = g = b = 0;
                    break;
            }
        }

        imageData.data[i * 4] = r;
        imageData.data[i * 4 + 1] = g;
        imageData.data[i * 4 + 2] = b;
        imageData.data[i * 4 + 3] = 255;
    }

    context.putImageData(imageData, 0, 0);
}
