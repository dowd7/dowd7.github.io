import * as THREE from 'three';

// Scene, Camera, Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// Add Ambient Light to the scene
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);

// Function to create a triangular prism with only side faces
function createTriangularPrism(color, x, y, depth = 0.2) {
  const geometry = new THREE.BufferGeometry();

  // Define vertices for front and back triangles
  const vertices = new Float32Array([
    // Front triangle (z = 0)
    0, 1, 0,    // Top vertex (0)
    -1, -1, 0,  // Bottom left (1)
    1, -1, 0,   // Bottom right (2)
    
    // Back triangle (z = depth)
    0, 1, depth,    // Top (3)
    -1, -1, depth,  // Bottom left (4)
    1, -1, depth    // Bottom right (5)
  ]);

  // Indices for three rectangular sides (two triangles per side)
  const indices = [
  // Front-left side
  0, 1, 4, 4, 3, 0,
  // Front-right side
  0, 2, 5, 5, 3, 0,
  // Bottom side (base)
  1, 2, 5, 5, 4, 1,
  // Back-left side
  3, 4, 1, 1, 0, 3,
  // Back-right side
  3, 5, 2, 2, 0, 3,
  // Front face
  0, 1, 2,
  // Back face
  3, 4, 5,
  ];

  geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  // Compute normals for proper lighting
  geometry.computeVertexNormals();

  const material = new THREE.MeshLambertMaterial({ 
    color: color,
    side: THREE.DoubleSide
  });

  const prism = new THREE.Mesh(geometry, material);
  prism.position.set(x, y, 0);
  return prism;
}

// Create three prisms for the Triforce
const triangle1 = createTriangularPrism(0xffff00, 0, 1);    // Top
const triangle2 = createTriangularPrism(0xffff00, -1, -1);  // Bottom left
const triangle3 = createTriangularPrism(0xffff00, 1, -1);   // Bottom right

// Add to scene
scene.add(triangle1, triangle2, triangle3);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate each triangle
  triangle1.rotation.y += 0.01;
  triangle2.rotation.y += 0.01;
  triangle3.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();