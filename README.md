# Paulo Júnior — Estudos

Site estático minimalista em **HTML + CSS + JS puro**. Sem build, sem banco de dados.

## Como rodar
Abra `index.html` no navegador — ou sirva localmente (recomendado, pois `study.html` usa `fetch`):
```powershell
python -m http.server 8000
# depois abra http://localhost:8000
```

## Como personalizar

Tudo se edita em **`js/config.js`**:

1. **Perfil / bio / objetivo / sociais** → objeto `PROFILE`.
2. **Novo post**:
   - Copie `studies/_modelo.html` → `studies/meu-topico.html` e edite.
   - Registre em `js/config.js` → array `POSTS` (slug, title, category, date, minutes, file).

## Blocos disponíveis dentro de cada post
- `h2` = título de seção · `h3` = subtítulo · `p` = texto normal
- `pre><code>` = codespace (ganha botão copiar sozinho)
- `img` / `figure` = imagem · `blockquote` = destaque · `.callout` = caixa de dica · `ul/li` = lista

## Estrutura
```
index.html  → sobre + lista de posts
study.html  → leitor genérico (?slug=...)
css/style.css
js/config.js  ← EDITE AQUI
js/main.js    → home
js/study.js   → leitor
studies/*.html → seus posts + _modelo.html
```
