/* background: grade de pontos com onda lenta + reação sutil ao cursor */
(function () {
  const host = document.querySelector(".bg");
  if (!host) return;

  const canvas = document.createElement("canvas");
  host.prepend(canvas);
  const ctx = canvas.getContext("2d");

  const GAP = 28;                 // distância entre pontos
  const INK = [28, 25, 23];       // --txt
  const ACCENT = [37, 99, 235];   // --accent
  const REACH = 160;              // raio de influência do cursor

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, dpr, cols, rows;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / GAP) + 1;
    rows = Math.ceil(h / GAP) + 1;
    if (reduced) draw(0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    mouse.x += (mouse.tx - mouse.x) * 0.08;   // segue o cursor com atraso suave
    mouse.y += (mouse.ty - mouse.y) * 0.08;

    const ox = (w % GAP) / 2;
    for (let j = 0; j < rows; j++) {
      const y = j * GAP + GAP / 2;
      // some em direção à parte de baixo da tela
      const fadeY = Math.max(0, 1 - y / (h * 0.85));
      if (fadeY <= 0) break;
      for (let i = 0; i < cols; i++) {
        const x = i * GAP + ox;
        // e também nas laterais
        const dx = (x - w / 2) / (w * 0.6);
        const fade = fadeY * Math.max(0, 1 - dx * dx);
        if (fade <= 0) continue;

        // onda diagonal lenta
        const wave = (Math.sin(x * 0.011 + y * 0.007 - t * 0.0005) + 1) / 2;

        // proximidade do cursor (0 longe → 1 em cima)
        const mx = x - mouse.x, my = y - mouse.y;
        const near = Math.max(0, 1 - Math.sqrt(mx * mx + my * my) / REACH);
        const n = near * near;

        const c = n > 0.01 ? mix(INK, ACCENT, n) : INK;
        const alpha = (0.05 + wave * 0.07 + n * 0.35) * fade;
        const r = 0.8 + wave * 0.35 + n * 0.9;

        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function mix(a, b, k) {
    return [a[0] + (b[0] - a[0]) * k | 0, a[1] + (b[1] - a[1]) * k | 0, a[2] + (b[2] - a[2]) * k | 0];
  }

  let last = 0;
  function loop(t) {
    if (t - last > 33) { draw(t); last = t; }   // ~30fps é suficiente aqui
    requestAnimationFrame(loop);
  }

  addEventListener("resize", resize);
  addEventListener("pointermove", (e) => { mouse.tx = e.clientX; mouse.ty = e.clientY; });
  document.addEventListener("pointerleave", () => { mouse.tx = mouse.ty = -9999; });

  resize();
  if (!reduced) requestAnimationFrame(loop);
})();
