import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";

/**
 * Debug
 */
const gui = new dat.GUI();
const param = {
  color: 0xffa400,
};

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new THREE.TextBufferGeometry("Hello world", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -textGeometry.boundingBox.max.x * 0.5,
  //   -textGeometry.boundingBox.max.y * 0.5,
  //   -textGeometry.boundingBox.max.z * 0.5
  // );
  textGeometry.center();

  const textMaterial = new THREE.MeshBasicMaterial();
  const text = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(text);
});

// cyan cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: param.color,
  wireframe: true,
  wireframeLinewidth: 3,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotation.reorder("yxz");
scene.add(mesh);

//  sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// gui.add(mesh.position, "y", -3, 3, 0.01);
// gui.add(mesh.position, "x", -3, 3, 0.01);
// gui.add(material, "wireframe");

gui.addColor(param, "color").onChange(() => {
  material.color.set(param.color);
});

// resize listener
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
});
// dblclick listener
window.addEventListener("dblclick", () => {
  const fullSCreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullSCreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

//  camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);

camera.position.z = 3;
scene.add(camera);
// camera.lookAt(mesh.position);
// renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
new OrbitControls(camera, canvas);
renderer.setSize(sizes.width, sizes.height);

// animations
const tick = () => {
  // update camera
  camera.position.x = Math.sin(2 * Math.PI * 2) * 3;
  camera.lookAt(mesh.position);
  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
