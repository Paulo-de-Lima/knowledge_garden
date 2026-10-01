/* index.html: renderiza página sobre */
(function () {
  const $ = (s) => document.querySelector(s);

  // ---- sobre ----
  $("#sobreTitulo").textContent = `Olá, eu sou ${PROFILE.name}.`;
  $("#sobreBio").textContent = PROFILE.bio;
  $("#sobreObjetivo").textContent = PROFILE.objective;
  $("#socials").innerHTML = PROFILE.socials.map(s =>
    `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`
  ).join("");

  // ---- stack (ícone monocromático + nome) ----
  const ICONS = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/";
  $("#stackGrid").innerHTML = STACK.map(t => `
    <span class="stack-item">
      ${t.icon ? `<span class="stack-icon" style="--icon:url('${ICONS}${t.icon}.svg')" aria-hidden="true"></span>` : ""}
      ${t.name}
    </span>`
  ).join("");

  // ---- projetos ----
  $("#projectsList").innerHTML = PROJECTS.map(p => `
    <a class="project-row" href="${p.url}" target="_blank" rel="noopener">
      <div class="project-top">
        <h3>${p.name}</h3>
        <span class="project-arrow">→</span>
      </div>
      <p>${p.description}</p>
      <div class="project-stack">${p.stack.join(" · ")}</div>
    </a>`
  ).join("");
})();
