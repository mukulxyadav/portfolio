import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Fixed background — renders to a fixed canvas, body has black bg so no blank-on-scroll
export default function Background3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = window.innerWidth, H = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 1000);
    camera.position.z = 90;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── PARTICLE FIELD ── */
    const COUNT = 2500;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const PALETTE = [
      [0.49, 0.43, 0.98], // purple
      [0.13, 0.83, 0.93], // cyan
      [0.95, 0.95, 0.95], // white
    ];
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 500;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 500;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 400;
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.35, vertexColors: true, transparent: true, opacity: 0.75, sizeAttenuation: true });
    const stars = new THREE.Points(geo, mat);
    scene.add(stars);

    /* ── AMBIENT GEOMETRY (wireframe torus) ── */
    const torusGeo = new THREE.TorusGeometry(30, 0.3, 8, 80);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x7c6dfa, transparent: true, opacity: 0.04, wireframe: true });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 4;
    scene.add(torus);

    const torus2 = torus.clone();
    torus2.rotation.x = -Math.PI / 3;
    torus2.rotation.y = Math.PI / 6;
    torus2.material.opacity = 0.025;
    scene.add(torus2);

    /* ── MOUSE ── */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    /* ── RESIZE ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── ANIMATE ── */
    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      stars.rotation.y = t * 0.008;
      stars.rotation.x = t * 0.003;

      torus.rotation.z = t * 0.04;
      torus2.rotation.z = -t * 0.03;

      camera.position.x += (mouse.x * 6 - camera.position.x) * 0.025;
      camera.position.y += (mouse.y * 6 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose(); mat.dispose(); torusGeo.dispose(); torusMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  );
}
