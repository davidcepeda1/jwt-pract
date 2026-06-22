import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import authRoutes from './routes/auth.routes.js';
import resourceRoutes from './routes/resource.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/', resourceRoutes);

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>JWT Demo</title>
  <style>
    body { font-family: monospace; max-width: 700px; margin: 40px auto; padding: 0 20px; background: #0d1117; color: #c9d1d9; }
    h1 { color: #58a6ff; }
    h2 { color: #8b949e; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; margin-top: 2rem; }
    input { background: #161b22; border: 1px solid #30363d; color: #c9d1d9; padding: 8px 12px; border-radius: 6px; width: 100%; box-sizing: border-box; margin-bottom: 8px; }
    button { background: #238636; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-right: 8px; margin-bottom: 8px; }
    button:hover { background: #2ea043; }
    button.sec { background: #1f6feb; }
    button.sec:hover { background: #388bfd; }
    pre { background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 16px; overflow-x: auto; white-space: pre-wrap; word-break: break-all; font-size: 0.8rem; }
    .ok { color: #3fb950; } .err { color: #f85149; }
    label { font-size: 0.85rem; color: #8b949e; }
  </style>
</head>
<body>
  <h1>&#128274; JWT RS256 — Demo</h1>

  <h2>1 — Obtener Access Token</h2>
  <label>Usuario</label>
  <input id="user" value="admin" />
  <label>Contraseña</label>
  <input id="pass" type="password" value="admin123" />
  <br>
  <button onclick="login()">POST /auth/token</button>
  <pre id="loginResult">—</pre>

  <h2>2 — Consumir recurso protegido</h2>
  <button class="sec" onclick="fetchResource('alpha')">GET /v1/service-alpha/private</button>
  <button class="sec" onclick="fetchResource('beta')">GET /v1/service-beta/private</button>
  <pre id="resourceResult">—</pre>

  <script>
    let token = null;

    async function login() {
      const res = await fetch('/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: document.getElementById('user').value, password: document.getElementById('pass').value })
      });
      const data = await res.json();
      const el = document.getElementById('loginResult');
      if (res.ok) {
        token = data.access_token;
        el.className = 'ok';
        el.textContent = JSON.stringify(data, null, 2);
      } else {
        el.className = 'err';
        el.textContent = JSON.stringify(data, null, 2);
      }
    }

    async function fetchResource(service) {
      if (!token) return alert('Primero obtén un token.');
      const res = await fetch('/v1/service-' + service + '/private', {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();
      const el = document.getElementById('resourceResult');
      el.className = res.ok ? 'ok' : 'err';
      el.textContent = JSON.stringify(data, null, 2);
    }
  </script>
</body>
</html>
`);
});

app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});
