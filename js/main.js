I've updated the project to include **jumping and sprint mechanics** for the player.

### Additions to `js/main.js`:

```js
// Add to player object
player.isJumping = false;
player.velocityY = 0;
player.gravity = 20; // units per second squared
player.jumpSpeed = 8; // units per second

// Modify movement update in animate()
if(controls.isLocked){
    const speed = keys.shift ? player.speed*2 : player.speed; // sprinting
    const dirVec = new THREE.Vector3();
    if(keys.w) dirVec.z -= 1; if(keys.s) dirVec.z += 1; if(keys.a) dirVec.x -= 1; if(keys.d) dirVec.x += 1;
    if(dirVec.length() > 0){
        dirVec.normalize();
        const euler = new THREE.Euler(0, camera.rotation.y, 0, 'YXZ');
        dirVec.applyEuler(euler);
        player.x += dirVec.x * speed * dt;
        player.z += dirVec.z * speed * dt;
    }
    // Jumping and gravity
    if(keys.space && !player.isJumping){
        player.velocityY = player.jumpSpeed;
        player.isJumping = true;
    }
    player.velocityY -= player.gravity * dt;
    player.y += player.velocityY * dt;
    if(player.y <= 1.6){ player.y = 1.6; player.velocityY = 0; player.isJumping = false; }

    // Apply position
    player.x = clamp(player.x, -98, 98);
    player.z = clamp(player.z, -98, 98);
    controls.getObject().position.set(player.x, player.y, player.z);
}

// Key listener for jump
window.addEventListener('keydown', e => { if(e.code === 'Space') keys.space = true; });
window.addEventListener('keyup', e => { if(e.code === 'Space') keys.space = false; });
```

### Key Points:

* **Sprint**: Hold `Shift` to move faster.
* **Jump**: Press `Space` to jump. Gravity pulls the player back down.
* Added `velocityY`, `isJumping`, `gravity`, and `jumpSpeed` to the player object.

Replace your current `js/main.js` movement section with this code to have fully functional jumping and sprinting.
