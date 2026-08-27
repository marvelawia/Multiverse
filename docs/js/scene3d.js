/* Multiverse — 3D battlefield environment (Three.js).
   A real 3D scene sits BEHIND the 2D HUD:
     - starfield
     - central metallic table
     - 4 multiverse portals + seat pods with name billboards and character sprites
   All art is ASSET-DRIVEN: drop graphics in /assets and they apply automatically.
   Fallbacks are drawn procedurally so it always renders.
   See docs/assets/README.md for the exact file names to drop in. */
(function () {
  'use strict';
  if (typeof THREE === 'undefined') return;
  var canvas = document.getElementById('bg-3d');
  if (!canvas) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0); // transparent — let the 2D particle layer show behind

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06070f, 0.016);

  var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
  camera.position.set(0, 11, 20);
  camera.lookAt(0, 1, 0);

  scene.add(new THREE.AmbientLight(0x6677bb, 0.9));
  var key = new THREE.PointLight(0x4cc9f0, 1.4, 200); key.position.set(0, 16, 10); scene.add(key);
  var fill = new THREE.PointLight(0xb06bff, 1.0, 200); fill.position.set(0, 8, -16); scene.add(fill);

  var ASSET = 'assets/';
  function loader() { var l = new THREE.TextureLoader(); l.setCrossOrigin('anonymous'); return l; }
  var TL = loader();

  function tex(w, h, draw) {
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    var x = c.getContext('2d'); draw(x, w, h);
    var t = new THREE.CanvasTexture(c); t.anisotropy = 4; return t;
  }
  // load a real asset if present, else use the procedural fallback texture
  function assetTex(url, w, h, draw) {
    var fb = tex(w, h, draw);
    TL.load(url, function (t) { if (t) { t.anisotropy = 4; fb.__swap = t; } }, undefined, function () {});
    return fb;
  }
  function swapIfReady(mat, slot) {
    if (mat.map && mat.map.__swap) { mat.map = mat.map.__swap; mat.needsUpdate = true; }
  }

  // ---- starfield ----
  (function () {
    var n = 1600, pos = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      var r = 60 + Math.random() * 120, t = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(t);
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * 60;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(t);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, sizeAttenuation: true, transparent: true, opacity: 0.85 })));
  })();

  // ---- central table ----
  var table = new THREE.Mesh(
    new THREE.CylinderGeometry(7.5, 8.2, 0.7, 80),
    new THREE.MeshStandardMaterial({
      color: 0x1a2240, metalness: 0.8, roughness: 0.35, emissive: 0x0a1230, emissiveIntensity: 0.5,
      map: assetTex(ASSET + 'table.png', 512, 512, function (x, w, h) {
        var g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#16203f'); g.addColorStop(1, '#0a1024');
        x.fillStyle = g; x.fillRect(0, 0, w, h);
        x.strokeStyle = 'rgba(76,201,240,0.25)'; x.lineWidth = 2;
        for (var i = 0; i <= w; i += 32) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, h); x.stroke(); x.beginPath(); x.moveTo(0, i); x.lineTo(w, i); x.stroke(); }
      })
    })
  );
  table.position.y = -0.4; scene.add(table);
  var ring = new THREE.Mesh(new THREE.TorusGeometry(7.3, 0.08, 12, 100), new THREE.MeshBasicMaterial({ color: 0x4cc9f0 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.1; scene.add(ring);

  // ---- seat pods + portals + characters ----
  var colors = [0x4cc9f0, 0xff5d93, 0xffa500, 0xb06bff];
  var pods = [
    { p: new THREE.Vector3(0, 0, 9), color: colors[0], you: true },
    { p: new THREE.Vector3(-9, 0, -3), color: colors[1] },
    { p: new THREE.Vector3(0, 0, -10), color: colors[2] },
    { p: new THREE.Vector3(9, 0, -3), color: colors[3] }
  ];

  function drawPortal(x, w, h, color) {
    var g = x.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(' + ((color >> 16) & 255) + ',' + ((color >> 8) & 255) + ',' + (color & 255) + ',0.0)');
    g.addColorStop(0.55, 'rgba(' + ((color >> 16) & 255) + ',' + ((color >> 8) & 255) + ',' + (color & 255) + ',0.25)');
    g.addColorStop(1, 'rgba(' + ((color >> 16) & 255) + ',' + ((color >> 8) & 255) + ',' + (color & 255) + ',0.0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h);
  }
  function drawChar(x, w, h, color) {
    x.clearRect(0, 0, w, h);
    x.save(); x.translate(w / 2, h);
    var c = '#' + ('000000' + color.toString(16)).slice(-6);
    x.fillStyle = c; x.globalAlpha = 0.95;
    x.beginPath(); x.arc(0, -h * 0.78, w * 0.16, 0, Math.PI * 2); x.fill();          // head
    x.beginPath(); x.moveTo(-w * 0.22, -h * 0.1); x.lineTo(w * 0.22, -h * 0.1); x.lineTo(w * 0.13, -h * 0.55); x.lineTo(-w * 0.13, -h * 0.55); x.closePath(); x.fill(); // body
    x.globalAlpha = 0.35; x.beginPath(); x.ellipse(0, -h * 0.05, w * 0.34, w * 0.08, 0, 0, Math.PI * 2); x.fill(); // shadow
    x.restore();
  }
  function nameTex(str, color) {
    return tex(256, 64, function (x, w, h) {
      x.clearRect(0, 0, w, h);
      x.font = 'bold 34px Cairo, Arial'; x.textAlign = 'center'; x.textBaseline = 'middle';
      x.direction = 'rtl';
      x.fillStyle = 'rgba(0,0,0,0.55)'; x.fillText(str, w / 2 + 1, h / 2 + 1);
      x.fillStyle = '#' + ('000000' + color.toString(16)).slice(-6); x.fillText(str, w / 2, h / 2);
    });
  }

  pods.forEach(function (pod, i) {
    var grp = new THREE.Group(); grp.position.copy(pod.p); scene.add(grp); pod.grp = grp;

    // portal (slightly outward from center)
    var out = pod.p.clone().normalize().multiplyScalar(pod.p.length() + 1.6);
    var pg = new THREE.Group(); pg.position.set(out.x, 2.6, out.z);
    var torus = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.18, 18, 100), new THREE.MeshBasicMaterial({ color: pod.color }));
    var disc = new THREE.Mesh(new THREE.CircleGeometry(2.0, 64), new THREE.MeshBasicMaterial({ map: assetTex(ASSET + 'portal.png', 256, 256, function (x, w, h) { drawPortal(x, w, h, pod.color); }), transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
    pg.add(torus); pg.add(disc); scene.add(pg);
    pod.portal = pg; pod.torus = torus;

    // seat platform
    var pad = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.9, 0.3, 48), new THREE.MeshStandardMaterial({ color: 0x141b33, metalness: 0.7, roughness: 0.4, emissive: pod.color, emissiveIntensity: 0.18 }));
    pad.position.y = -0.1; grp.add(pad);
    var pr = new THREE.Mesh(new THREE.TorusGeometry(2.55, 0.06, 10, 64), new THREE.MeshBasicMaterial({ color: pod.color }));
    pr.rotation.x = Math.PI / 2; pr.position.y = 0.06; grp.add(pr);

    // character sprite (procedural fallback, replaced by assets/char-<name>.png if present)
    var charMat = new THREE.SpriteMaterial({ map: assetTex(ASSET + 'char-' + i + '.png', 256, 384, function (x, w, h) { drawChar(x, w, h, pod.color); }), transparent: true });
    var sp = new THREE.Sprite(charMat); sp.scale.set(2.4, 3.6, 1); sp.position.set(0, 1.9, 0.2); grp.add(sp); pod.char = sp;

    // name billboard
    var nm = new THREE.Sprite(new THREE.SpriteMaterial({ map: nameTex(pod.you ? 'أنت' : ('خصم ' + i), pod.color), transparent: true }));
    nm.scale.set(3.0, 0.75, 1); nm.position.set(0, 4.0, 0.2); grp.add(nm); pod.name = nm; pod.color = pod.color;
  });

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize); resize();

  // sync seat names from the live DOM (#seats) every couple seconds
  var names = ['أنت', 'خصم 1', 'خصم 2', 'خصم 3'];
  function syncNames() {
    try {
      var els = document.querySelectorAll('#seats .seat');
      for (var i = 0; i < pods.length; i++) {
        var el = els[i]; if (!el) continue;
        var n = el.querySelector('.name'); if (!n) continue;
        var txt = (n.textContent || '').trim(); if (!txt) continue;
        if (txt !== pods[i]._n) {
          pods[i]._n = txt;
          pods[i].name.material.map = nameTex(txt, pods[i].color); pods[i].name.material.needsUpdate = true;
        }
        var on = el.classList.contains('turn');
        pods[i].portal.scale.setScalar(on ? 1.25 : 1.0);
        pods[i].torus.material.color.setHex(on ? 0xffd700 : pods[i].color);
      }
    } catch (e) {}
  }
  setInterval(syncNames, 2000); syncNames();

  var t = 0;
  function animate() {
    t += 0.01;
    for (var i = 0; i < pods.length; i++) pods[i].torus.rotation.z += 0.01 + i * 0.002;
    camera.position.x = Math.sin(t * 0.12) * 3.5;
    camera.position.y = 11 + Math.sin(t * 0.08) * 0.8;
    camera.lookAt(0, 1, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  // public hook so render.js can push real data later
  window.MV3D = {
    setSeatName: function (i, name) { if (pods[i]) { pods[i]._n = name; pods[i].name.material.map = nameTex(name, pods[i].color); pods[i].name.material.needsUpdate = true; } },
    setCharacterAsset: function (i, url) { if (pods[i]) pods[i].char.material.map = assetTex(url, 256, 384, function (x, w, h) { drawChar(x, w, h, pods[i].color); }); }
  };
})();
