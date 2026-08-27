/* Multiverse — 3D cosmic battlefield backdrop (Three.js).
   Renders behind the 2D UI: starfield, 4 glowing multiverse portals,
   and a central metallic table. Purely decorative; game logic untouched. */
(function () {
  'use strict';
  if (typeof THREE === 'undefined') return;
  var canvas = document.getElementById('bg-3d');
  if (!canvas) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  } catch (e) {
    return; // WebGL unavailable — fall back to the flat background
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06070f);
  scene.fog = new THREE.FogExp2(0x06070f, 0.018);

  var camera = new THREE.PerspectiveCamera(55, 1, 0.1, 300);
  camera.position.set(0, 9, 17);
  camera.lookAt(0, 1, 0);

  scene.add(new THREE.AmbientLight(0x5566aa, 0.8));
  var key = new THREE.PointLight(0x4cc9f0, 1.3, 120); key.position.set(0, 14, 8); scene.add(key);
  var fill = new THREE.PointLight(0xb06bff, 0.9, 120); fill.position.set(0, 7, -12); scene.add(fill);

  // starfield
  (function () {
    var n = 1400, pos = new Float32Array(n * 3);
    for (var i = 0; i < n; i++) {
      var r = 50 + Math.random() * 90;
      var t = Math.random() * Math.PI * 2;
      var ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(t);
      pos[i * 3 + 1] = (Math.random() * 2 - 1) * 50;
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(t);
    }
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var m = new THREE.PointsMaterial({ color: 0xffffff, size: 0.45, sizeAttenuation: true, transparent: true, opacity: 0.85 });
    scene.add(new THREE.Points(g, m));
  })();

  // central table
  var table = new THREE.Mesh(
    new THREE.CylinderGeometry(7, 7.6, 0.6, 72),
    new THREE.MeshStandardMaterial({ color: 0x1a2240, metalness: 0.75, roughness: 0.35, emissive: 0x0a1230, emissiveIntensity: 0.45 })
  );
  table.position.y = -0.35;
  scene.add(table);

  var ring = new THREE.Mesh(
    new THREE.TorusGeometry(6.7, 0.07, 12, 90),
    new THREE.MeshBasicMaterial({ color: 0x4cc9f0 })
  );
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.05; scene.add(ring);

  // 4 multiverse portals behind each seat
  var colors = [0x4cc9f0, 0xb06bff, 0xffa500, 0xff5d93];
  var portals = [];
  for (var i = 0; i < 4; i++) {
    var a = i * Math.PI / 2 + Math.PI / 4;
    var R = 9.5;
    var grp = new THREE.Group();
    var torus = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.16, 16, 90),
      new THREE.MeshBasicMaterial({ color: colors[i] })
    );
    grp.add(torus);
    var disc = new THREE.Mesh(
      new THREE.CircleGeometry(1.9, 56),
      new THREE.MeshBasicMaterial({ color: colors[i], transparent: true, opacity: 0.16, side: THREE.DoubleSide })
    );
    grp.add(disc);
    grp.position.set(Math.cos(a) * R, 2.3, Math.sin(a) * R);
    grp.lookAt(0, 2.3, 0);
    scene.add(grp);
    portals.push({ torus: torus, speed: 0.3 + Math.random() * 0.5 });
  }

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  var t = 0;
  function animate() {
    t += 0.01;
    for (var i = 0; i < portals.length; i++) portals[i].torus.rotation.z += portals[i].speed * 0.02;
    camera.position.x = Math.sin(t * 0.15) * 3;
    camera.lookAt(0, 1, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
})();
