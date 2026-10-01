/* posts.html: renderiza lista de posts */
(function () {
  const $ = (s) => document.querySelector(s);

  const list = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  $("#postsList").innerHTML = list.map(p => {
    const [y, m, d] = p.date.split("-");
    const dateStr = `${d} ${monthName(m)} ${y}`;
    return `
      <a class="post-row" href="study.html?slug=${p.slug}">
        <span class="post-date">${dateStr}</span>
        <span class="post-title">${p.title}</span>
        <span class="post-cat">${p.category}</span>
      </a>`;
  }).join("");

  function monthName(m) {
    const names = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    return names[parseInt(m, 10) - 1];
  }
})();
