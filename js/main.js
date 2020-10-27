function getLocation(cb = () => { }) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(cb);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const objects = document.getElementById("objects");

    objects.setAttribute("gps-entity-place", "latitude: " + position.coords.latitude + "; longitude: " + position.coords.longitude);
    objects.setAttribute("visible", "true");
}

let isOpening = false;
function openurl(url) {
    if (!isOpening) {
        window.open(url);
        isOpening = true;
        setTimeout(() => isOpening = false, 200);
    }

    console.log(url);

    return isOpening;
}

AFRAME.registerComponent('log-hover', {
    init: function () {
        this.el.addEventListener('mouseenter', function () {
            console.log('mouseenter', this.id);
        });
        this.el.addEventListener('mouseleave', function () {
            console.log('mouseleave', this.id);
        });
    }
});

AFRAME.registerComponent('ar-scene', {
    init: function () {
        const clickToStart = document.getElementById('clickToStart');

        clickToStart.addEventListener('click', () => {
            const screen = document.getElementById('screen');

            screen.setAttribute('position', '0 0 -1');
            screen.setAttribute('visible', 'true');
            screen.setAttribute('scale', '0.1 0.1 0.1');

            getLocation(showPosition)

            clickToStart.remove();
        });

        document.getElementById('index1').addEventListener('click', function (e) {
            openurl("https://www.sadia.com.br/quantomaisvocesabe/receitas/?ingredientes=linguiças");
        })
        document.getElementById('index2').addEventListener('click', function (e) {
            openurl("https://www.sadia.com.br/quantomaisvocesabe/receitas/?ingredientes=peito%20de%20peru");
        })
        document.getElementById('index3').addEventListener('click', function (e) {
            openurl("https://www.sadia.com.br/bio/");
        })
        document.getElementById('index4').addEventListener('click', function (e) {
            openurl("https://www.sadia.com.br/quantomaisvocesabe/receitas/?ingredientes=frango");
        })
        document.getElementById('index5').addEventListener('click', function (e) {
            openurl("https://www.sadia.com.br/quantomaisvocesabe/menu-da-semana/semana-1/");
        })
        document.getElementById('index6').addEventListener('click', function (e) {
            openurl("https://www.sadia.com.br/");
        })
        document.getElementById('logo-sadia-index').addEventListener('click', function (e) {
            openurl("https://www.sadia.com.br/");
        })
    }
});