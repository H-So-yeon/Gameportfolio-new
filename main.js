import { GLTFLoader } from 'https://unpkg.com/three@0.141.0/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer, Clock } from 'https://unpkg.com/three@0.141.0/build/three.module.js';
import * as THREE from 'https://unpkg.com/three@0.141.0/build/three.module.js';

// Scene setup
const scene = new THREE.Scene();

// Background
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialias: true,
  alpha: true // 
});
renderer.outputEncoding = THREE.sRGBEncoding;

// Screen size
function resizeRendererToDisplaySize() {
  const canvas = renderer.domElement;
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (canvas.width !== width || canvas.height !== height) {
    renderer.setSize(width, height, false);
  }
}

// Camera setup
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.3, 0.3, 6.8);

// Transparent background
scene.background = null; 

// Lights setup
const ambientLight = new THREE.AmbientLight(0xffffff, 5.0);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); 
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// GLTFLoader to load model
let model = null;
let mixer = null;
const clock = new Clock();

const loader = new GLTFLoader();
loader.load('birbs/scene.gltf', function (gltf) {
  model = gltf.scene;
  
  // Center the model
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);
  scene.add(model);

  // Animation mixer
  if (gltf.animations.length > 0) {
    mixer = new AnimationMixer(model);
    gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
  }

  animate();
});

// Variables for mouse controls
let isDragging = false;
let previousMousePosition = null;

// Event listeners for mouse controls
renderer.domElement.addEventListener('mousedown', function (event) {
  isDragging = true;

  if (!previousMousePosition) {
    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
});

renderer.domElement.addEventListener('mousemove', function (event) {
  if (isDragging && model) {
    if (previousMousePosition) {
      const deltaMove = {
        x: event.clientX - previousMousePosition.x
      };

      model.rotation.y += deltaMove.x * 0.01;

      previousMousePosition = { x: event.clientX, y: event.clientY };
    }
  }
});

renderer.domElement.addEventListener('mouseup', function () {
  isDragging = false;
  previousMousePosition = null;
});

renderer.domElement.addEventListener('mouseleave', function () {
  isDragging = false;
  previousMousePosition = null;
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  

  if (mixer) {
    mixer.update(clock.getDelta());
  }
  
  resizeRendererToDisplaySize();
  renderer.render(scene, camera);
}

// Select btn link
document.getElementById("selectButton").addEventListener("click", function () {
  window.open("https://www.soyeonhwang.com/", "_blank");
});

// Home btn link
document.getElementById("homeButton").addEventListener("click", function () {
  window.open("https://www.soyeonhwang.com/", "_blank");
});
