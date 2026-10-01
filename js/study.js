/* study.html: carrega o HTML do estudo via fetch, monta code copy + prev/next */
(function () {
  const $ = (s) => document.querySelector(s);

  const slug = new URLSearchParams(location.search).get("slug");
  const post = POSTS.find(p => p.slug === slug) || POSTS[0];
  if (!post) { $("#studyContent").innerHTML = "<p>Nenhum post cadastrado.</p>"; return; }
  document.title = `${post.title} — Paulo Júnior`;

  const idx = POSTS.indexOf(post);
  const prev = POSTS[idx - 1], next = POSTS[idx + 1];

  const [y, m, d] = post.date.split("-");
  const monthNames = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const dateStr = `${d} ${monthNames[parseInt(m, 10) - 1]} ${y}`;

  $("#studyHeader").innerHTML = `
    <div class="crumbs"><a href="posts.html">posts</a> / ${post.category}</div>
    <h1>${post.title}</h1>
    <p class="lead">${post.description}</p>
    <div class="study-badges">
      <span class="pill">${post.category}</span>
      <span class="pill">${dateStr}</span>
      <span class="pill">~${post.minutes} min de leitura</span>
    </div>`;

  $("#studyNav").innerHTML = `
    ${prev ? `<a href="study.html?slug=${prev.slug}">← ${prev.title}</a>` : `<span></span>`}
    ${next ? `<a href="study.html?slug=${next.slug}" style="text-align:right">${next.title} →</a>` : ``}`;

  fetch(post.file)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(html => {
      const box = $("#studyContent");
      box.innerHTML = html;

      // botões de copiar em cada <pre><code>
      box.querySelectorAll("pre").forEach(pre => {
        const wrap = document.createElement("div");
        wrap.className = "codeblock";
        pre.parentNode.insertBefore(wrap, pre);
        wrap.appendChild(pre);
        const btn = document.createElement("button");
        btn.className = "copy-btn"; btn.textContent = "copiar";
        btn.onclick = () => {
          navigator.clipboard.writeText(pre.innerText).then(() => {
            btn.textContent = "copiado ✓"; setTimeout(() => btn.textContent = "copiar", 1500);
          });
        };
        wrap.appendChild(btn);
      });
    })
    .catch(() => {
      $("#studyContent").innerHTML = `<p>Não achei o arquivo <code>${post.file}</code>. Verifique o caminho em <code>js/config.js</code>.</p>`;
    });
})();
