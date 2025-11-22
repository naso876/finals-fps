// Main game logic
controls.getObject().position.copy(camera.position);


// Weapon
const weaponGeo = new THREE.BoxGeometry(0.2,0.15,0.6);
const weaponMat = new THREE.MeshStandardMaterial({color:'#333'});
const weapon = new THREE.Mesh(weaponGeo, weaponMat);
weapon.position.set(0,-0.15,-0.5);
camera.add(weapon);
scene.add(camera);


// Enemies
const enemies = [];
let wave = 0;
function nextWave(){
wave++;
const num = 3 + Math.floor(wave*2.2);
for(let i=0;i<num;i++) enemies.push(new Enemy(scene, wave));
}
nextWave();


// HUD
const scoreEl = document.getElementById('score');
const waveEl = document.getElementById('wave');
const hpEl = document.getElementById('hp');
const enCountEl = document.getElementById('enCount');
function updateUI(){
scoreEl.textContent = 0;
waveEl.textContent = wave;
hpEl.textContent = Math.floor(player.hp);
enCountEl.textContent = enemies.length;
}
updateUI();


// Animation loop
let prevTime = performance.now()/1000;
function animate(){
const now = performance.now()/1000;
const dt = Math.min(0.05, now-prevTime);
prevTime = now;


// Player movement
if(controls.isLocked){
const speed = keys.shift?player.speed*1.6:player.speed;
const dirVec = new THREE.Vector3();
if(keys.w) dirVec.z-=1;if(keys.s) dirVec.z+=1;if(keys.a) dirVec.x-=1;if(keys.d) dirVec.x+=1;
if(dirVec.length()>0){dirVec.normalize();const euler=new THREE.Euler(0,camera.rotation.y,0,'YXZ');dirVec.applyEuler(euler);player.x+=dirVec.x*speed*dt;player.z+=dirVec.z*speed*dt;}
player.x = clamp(player.x,-98,98);
player.z = clamp(player.z,-98,98);
controls.getObject().position.set(player.x,player.y,player.z);
}


// Update enemies
for(const en of enemies) en.update(dt, player);


renderer.render(scene, camera);
requestAnimationFrame(animate);
}
animate();


// Player movement keys
const keys={w:false,a:false,s:false,d:false,shift:false};
window.addEventListener('keydown', e=>{ const k=e.key.toLowerCase(); if(k in keys) keys[k]=true; });
window.addEventListener('keyup', e=>{ const k=e.key.toLowerCase(); if(k in keys) keys[k]=false; });
