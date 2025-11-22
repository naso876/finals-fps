class Enemy {
constructor(scene, wave) {
const g = new THREE.SphereGeometry(0.6, 16, 12);
const m = new THREE.MeshStandardMaterial({ color: 0xff5555 });
this.mesh = new THREE.Mesh(g, m);
const angle = Math.random()*Math.PI*2;
this.mesh.position.set(Math.cos(angle)*80, 0.6, Math.sin(angle)*80);
this.hp = 30 + wave*8;
this.speed = 1.5 + wave*0.2;
scene.add(this.mesh);
}


update(dt, player) {
const dx = player.x - this.mesh.position.x;
const dz = player.z - this.mesh.position.z;
const d = Math.hypot(dx, dz)||0.001;
this.mesh.position.x += dx/d * this.speed * dt;
this.mesh.position.z += dz/d * this.speed * dt;
}
}
