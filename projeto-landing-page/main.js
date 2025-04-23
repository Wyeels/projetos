import * as THREE from 'https://cdn.skypack.dev/three@0.133.0'
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.0/examples/jsm/loaders/GLTFLoader.js'

const prol = document.getElementById('dvi')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setClearColor(0x000000, 0)
renderer.setSize(window.innerWidth, window.innerHeight)
prol.appendChild(renderer.domElement)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-1, 1, 8)
scene.add(light)

const loader = new GLTFLoader();
let pitaya = null

loader.load('imagens/maca.glb', (gltf) => {
  pitaya = gltf.scene
  pitaya.scale.set(.5, .5, .5)
  pitaya.position.set(-2, 2, -2)
  scene.add(pitaya)
}, undefined, (error) => {
  console.error('Erro ao carregar modelo:', error)
})

let banana = null

loader.load('imagens/pitaya.glb', (gltf) => {
  banana = gltf.scene
  banana.scale.set(.5, .5, .5)
  banana.position.set(-.5, -.1, 0)
  scene.add(banana)
}, undefined, (error) => {
  console.error('Erro ao carregar modelo:', error)
})

let morango = null

loader.load('imagens/morango.glb', (gltf) => {
  morango = gltf.scene
  morango.scale.set(.5, .5, .5)
  morango.position.set(1, -1.5, -1)
  scene.add(morango)
}, undefined, (error) => {
  console.error('Erro ao carregar modelo:', error)
})

let maca = null

loader.load('imagens/banana.glb', (gltf) => {
  maca = gltf.scene
  maca.scale.set(.5, .5, .5)
  maca.position.set(-1.5, -2.5, -1)
  scene.add(maca)
}, undefined, (error) => {
  console.error('Erro ao carregar modelo:', error)
})

function animate() {
  requestAnimationFrame(animate)
  if (pitaya) pitaya.rotation.y += 0.01
  if (banana) banana.rotation.y += 0.01
  if (morango) morango.rotation.y += 0.01
  if (maca) maca.rotation.y += 0.01
  renderer.render(scene, camera)
}
animate()

