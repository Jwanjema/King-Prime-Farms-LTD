"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// Procedural "golden ranch at dusk": a rolling terrain of particles blending
// pine green -> gold by elevation, plus drifting gold dust. Mouse parallax.
export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x12241a, 0.055);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 60);
    camera.position.set(0, 2.4, 7);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    mount.appendChild(renderer.domElement);

    // ---- terrain particles ----
    const COLS = 130, ROWS = 78;
    const W = 26, D = 13;
    const count = COLS * ROWS;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const base = []; // {x, z}
    const pine = new THREE.Color(0x2b4a36);
    const midg = new THREE.Color(0x53663a);
    const gold = new THREE.Color(0xc9a24b);

    let i3 = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c / (COLS - 1) - 0.5) * W;
        const z = (r / (ROWS - 1) - 0.5) * D - 1.5;
        base.push(x, z);
        pos[i3] = x; pos[i3 + 1] = 0; pos[i3 + 2] = z;
        i3 += 3;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const mat = new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.95, depthWrite: false });
    const terrain = new THREE.Points(geo, mat);
    scene.add(terrain);

    // ---- floating gold dust ----
    const DUST = 220;
    const dpos = new Float32Array(DUST * 3);
    const dseed = new Float32Array(DUST);
    for (let i = 0; i < DUST; i++) {
      dpos[i * 3] = (Math.random() - 0.5) * 20;
      dpos[i * 3 + 1] = Math.random() * 4 + 0.4;
      dpos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
      dseed[i] = Math.random() * Math.PI * 2;
    }
    const dgeo = new THREE.BufferGeometry();
    dgeo.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
    const dmat = new THREE.PointsMaterial({ size: 0.06, color: 0xd8b25c, transparent: true, opacity: 0.7, depthWrite: false });
    const dust = new THREE.Points(dgeo, dmat);
    scene.add(dust);

    // elevation function: layered waves = rolling hills
    const elev = (x, z, t) =>
      Math.sin(x * 0.45 + t * 0.6) * 0.45 +
      Math.cos(z * 0.7 - t * 0.4) * 0.35 +
      Math.sin((x + z) * 0.25 + t * 0.25) * 0.5 +
      Math.sin(x * 1.3 + z * 0.9 + t * 0.8) * 0.12;

    const tmp = new THREE.Color();
    const paint = (t) => {
      const p = geo.attributes.position.array;
      const cl = geo.attributes.color.array;
      let j = 0, b = 0;
      for (let k = 0; k < count; k++) {
        const x = base[b], z = base[b + 1];
        const y = elev(x, z, t);
        p[j + 1] = y;
        const h = THREE.MathUtils.clamp((y + 1.4) / 2.8, 0, 1);
        if (h < 0.62) tmp.copy(pine).lerp(midg, h / 0.62);
        else tmp.copy(midg).lerp(gold, (h - 0.62) / 0.38);
        cl[j] = tmp.r; cl[j + 1] = tmp.g; cl[j + 2] = tmp.b;
        j += 3; b += 2;
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.color.needsUpdate = true;
    };

    // mouse parallax
    const target = { x: 0, y: 0 };
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0, t = 0, hidden = false;
    const onVis = () => { hidden = document.hidden; };
    document.addEventListener("visibilitychange", onVis);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (hidden) return;
      t += 0.008;
      paint(t);
      const dp = dgeo.attributes.position.array;
      for (let i = 0; i < DUST; i++) {
        dp[i * 3 + 1] += 0.0035;
        dp[i * 3] += Math.sin(t * 2 + dseed[i]) * 0.0015;
        if (dp[i * 3 + 1] > 4.6) dp[i * 3 + 1] = 0.3;
      }
      dgeo.attributes.position.needsUpdate = true;
      camera.position.x += (target.x * 0.9 - camera.position.x) * 0.03;
      camera.position.y += (2.4 - target.y * 0.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0.4, 0);
      renderer.render(scene, camera);
    };

    if (reduced) {
      paint(0);
      renderer.render(scene, camera);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose(); mat.dispose(); dgeo.dispose(); dmat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero3d" aria-hidden />;
}
