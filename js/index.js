var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e86258");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(document.innerWidth, document.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// #region Cube 
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 });

var mesh = new THREE.Mesh(geometry, material);
mesh.position.x = -1
scene.add(mesh);

//#endregion


var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0, 0, 0);
scene.add(light);

var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
light.position.set(0, 0, 25);
scene.add(light);

var render = function () {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    for (var i = 0; i < intersects.length; i++) {

        intersects[i].object.material.color.set(0xff0000);
        this.tl = new TimelineMax({ paused: false }).delay(.3);
        this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.rotation, .5, { y: Math.Pi * .5, ease: Expo.easeOut }, "=-1.5");

    }
}

render();

window.addEventListener('click', onMouseMove);

// const inputHandler = document.getElementById('inputhandler')
// inputHandler.onkeypress = function () {
//   console.log('h')
// }

// // inputHandler.addEventListener('focus', () => {
// //   console.log('has focus press a key');
// // });
 
// // inputHandler.addEventListener('blur', () => {
// //   console.log('lost focus');
// // });
 
// // inputHandler.addEventListener('keydown', (e) => {
// //   console.log(`keyCode: ${e.keyCode}`);
// // });