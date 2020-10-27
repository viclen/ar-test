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
            window.open("https://www.sadia.com.br/quantomaisvocesabe/receitas/?ingredientes=linguiças");
        })
        const image2 = document.querySelector('#index2');
        image2.addEventListener('click', function (e) {
            window.open("https://www.sadia.com.br/quantomaisvocesabe/receitas/?ingredientes=peito%20de%20peru");
        })
        const image3 = document.querySelector('#index3');
        image3.addEventListener('click', function (e) {
            window.open("https://www.sadia.com.br/bio/");
        })
        const image4 = document.querySelector('#index4');
        image4.addEventListener('click', function (e) {
            window.open("https://www.sadia.com.br/quantomaisvocesabe/receitas/?ingredientes=frango");
        })
        const image5 = document.querySelector('#index5');
        image5.addEventListener('click', function (e) {
            window.open("https://www.sadia.com.br/quantomaisvocesabe/menu-da-semana/semana-1/");
        })
        const image6 = document.querySelector('#index6');
        image6.addEventListener('click', function (e) {
            window.open("https://www.sadia.com.br/");
        })
    }
})

AFRAME.registerComponent("listener", {
    init: function () {
        this.target = document.querySelector('#target'); // your video
        this.prevPosition = null; // initially there is no position or rotation
        this.prevRotation = null;
    },

    tick: function () {
        if (this.el.object3D.visible) {
            this.target.setAttribute('visible', 'true')

            if (!this.prevPosition && !this.prevRotation) {
                // there are no values to lerp from - set the initial values
                this.target.setAttribute('position', this.el.getAttribute('position'))
                this.target.setAttribute('rotation', this.el.getAttribute('rotation'))
            } else {
                // use the previous values to get an approximation 
                this.target.object3D.position.lerp(this.prevPosition, 0.1)

                // this (below) may seem ugly, but the rotation is a euler, not a THREE.Vector3, 
                // so to use the lerp function i'm doing some probably unnecessary conversions
                let rot = this.target.object3D.rotation.toVector3().lerp(this.prevRotation, 0.1)
                this.target.object3D.rotation.setFromVector3(rot)
            }
            // update the values
            this.prevPosition = this.el.object3D.position
            this.prevRotation = this.el.object3D.rotation
        } else {
            // the marker dissapeared - reset the values
            this.target.setAttribute('visible', 'false')
            this.prevPosition = null;
            this.prevRotation = null;
        }
    }
})