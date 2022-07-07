import { VRButton } from './VRButton.js';





let galleryImages = [
    './images/image0.jpg',
    './images/image1.jpg',
    './images/image2.jpg',
    './images/image3.jpg',
    './images/image4.jpg',
    './images/image5.jpg',
];

let viewerContainer = document.getElementById('webglviewer');

let clock = new THREE.Clock();

let camera;
let scene;
let renderer;
let textureLoader;
let viewer;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000);
    textureLoader = new THREE.TextureLoader();
    
    //Image Viewer
    let viewerGeometry = new THREE.SphereGeometry(500, 60, 40);
    viewerGeometry.scale(-1, 1, 1);
    
    let viewerMaterial = new THREE.MeshBasicMaterial({
        map: textureLoader.load(galleryImages[0])
    });
    
    viewer = new THREE.Mesh(viewerGeometry, viewerMaterial);
    viewer.rotation.y = -Math.PI / 2;
    scene.add(viewer);
    
    //Initialize the Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    viewerContainer.appendChild(renderer.domElement);
    document.body.appendChild( VRButton.createButton(renderer));
    renderer.setAnimationLoop(animate);
    
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);

    animate();
}


/**
 * Main Render Loop
 */
function animate() {
    renderer.render(scene,camera);
}

init();