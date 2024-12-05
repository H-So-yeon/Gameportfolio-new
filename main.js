import { GLTFLoader } from 'https://unpkg.com/three@0.141.0/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'https://unpkg.com/three@0.141.0/build/three.module.js';

// Scene setup
const scene = new THREE.Scene();

// Renderer setup with alpha enabled for transparency
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialias: true,
  alpha: true // Enable transparency
});
renderer.outputEncoding = THREE.sRGBEncoding;

// Resize renderer to match screen size
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
camera.position.set(0, 0, 400);

// Set background to transparent
scene.background = null; // No background color or texture

// Lights setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Neutral light
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// GLTFLoader to load model
let model = null;
const loader = new GLTFLoader();
loader.load('birbs/scene.gltf', function (gltf) {
  model = gltf.scene;
  scene.add(model);

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
  resizeRendererToDisplaySize();
  renderer.render(scene, camera);
}

//select btn link
document.getElementById("selectButton").addEventListener("click", function () {
  window.open("https://www.soyeonhwang.com/", "_blank");
});

//select home link
document.getElementById("homeButton").addEventListener("click", function () {
  window.open("https://www.soyeonhwang.com/", "_blank");
});