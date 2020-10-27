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
    window.open(url);

    console.log(url);

    return isOpening;
}

AFRAME.registerComponent('ar-link', {
    init: function () {
        this.el.addEventListener('click', function () {
            openurl(this.getAttribute('href'));
        });
    }
});

AFRAME.registerComponent('ar-scene', {
    init: function () {
        const clickToStart = document.getElementById('clickToStart');

        clickToStart.addEventListener('click', () => {
            const screen = document.getElementById('screen');

            screen.setAttribute('position', '0 0 0');
            screen.setAttribute('visible', 'true');
            screen.setAttribute('scale', '1 1 1');

            getLocation(showPosition)

            clickToStart.remove();
        });
    }
});