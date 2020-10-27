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
        console.log(url);
        isOpening = true;
        setTimeout(() => isOpening = false, 500);
    }
}

AFRAME.registerComponent('ar-link', {
    init: function () {
        this.el.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            console.log('click', this.el.id);
            if (event.target.id === this.el.id)
                openurl(this.el.getAttribute('href'));
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

            getLocation(showPosition);

            clickToStart.remove();
        });
    }
});