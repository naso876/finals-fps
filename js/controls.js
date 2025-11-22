// PointerLockControls helper
let controls;
function initControls(camera, renderer) {
controls = new THREE.PointerLockControls(camera, renderer.domElement);
const message = document.getElementById('message');
message.addEventListener('click', () => { controls.lock(); });
controls.addEventListener('lock', () => { message.style.display='none'; });
controls.addEventListener('unlock', () => { message.style.display='flex'; message.textContent='Pointer unlocked. Click to lock again.'; });
return controls;
}
