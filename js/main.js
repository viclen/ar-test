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
function open(url) {
    isOpening = true;
    if (!isOpening) {
        window.open(url);
        setTimeout(() => isOpening = false, 100);
    }
}

AFRAME.registerComponent('ar-scene', {
    init: function () {
        const clickToStart = document.getElementById('clickToStart');

        clickToStart.addEventListener('click', () => {
            const screen = document.getElementById('screen');

            screen.setAttribute('position', '0 0 -10');
            screen.setAttribute('visible', 'true');
            screen.setAttribute('scale', '1 1 1');

            getLocation(showPosition)

            clickToStart.remove();
        });

        const image1 = document.querySelector('#index1');
        image1.addEventListener('click', function (e) {
            open("https://www.sadia.com.br/quantomaisvocesabe/receitas/?ingredientes=linguiças");
        })
        const image2 = document.querySelector('#index2');
        image2.addEventListener('click', function (e) {
            open("https://www.sadia.com.br/quantomaisvocesabe/receitas/?ingredientes=peito%20de%20peru");
        })
        const image3 = document.querySelector('#index3');
        image3.addEventListener('click', function (e) {
            open("https://www.sadia.com.br/bio/");
        })
        const image4 = document.querySelector('#index4');
        image4.addEventListener('click', function (e) {
            open("https://www.sadia.com.br/quantomaisvocesabe/receitas/?ingredientes=frango");
        })
        const image5 = document.querySelector('#index5');
        image5.addEventListener('click', function (e) {
            open("https://www.sadia.com.br/quantomaisvocesabe/menu-da-semana/semana-1/");
        })
        const image6 = document.querySelector('#index6');
        image6.addEventListener('click', function (e) {
            open("https://www.sadia.com.br/");
        })
    }
})