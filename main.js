import * as three from 'three';

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Define a triangle using BufferGeometry
const geometry = new three.BufferGeometry();
const vertices = new Float32Array([
  0, 1, 0,  // Vertex 1
  -1, -1, 0, // Vertex 2
  1, -1, 0   // Vertex 3
]);
geometry.setAttribute('position', new three.BufferAttribute(vertices, 3));

const material = new three.MeshBasicMaterial({ color: 0x00ff00, side: three.DoubleSide });
const triangle = new three.Mesh(geometry, material);
scene.add(triangle);

camera.position.z = 2;
const animate = function () {
  requestAnimationFrame(animate);

  triangle.rotation.y += 0.01;

  renderer.render(scene, camera);
};
animate();
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});