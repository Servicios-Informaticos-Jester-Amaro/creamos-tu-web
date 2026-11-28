# FICHA DE REFERENCIA — Control UI de Claw (acceso desde el celular)

<!-- observed: 2026-10-04 | status: active -->
<!-- project: path:/root/.openclaw/workspace -->

> **Para qué sirve esta ficha:** cuando el CEO no pueda entrar al panel de Claw (o le dé error),
> leer ESTO primero. Contiene la URL buena, el puerto, el tipo de auth y los comandos de rescate.

## 🎯 LA URL BUENA (favoritos del CEO)

```
http://162.247.153.98/claw/
```

- ✅ Puerto **`:80`** (el ÚNICO puerto abierto al internet además del `:22`).
- ✅ With `/` al final (sin el slash da 302 → redirige igual, pero mejor con slash).
- ✅ `:80` es **nginx**. Funciona porque nginx hace de proxy a `127.0.0.1:18789` (el gateway real).

## 🔑 QUÉ PIDE PARA ENTRAR

- **Modal "Panel de Gateway"** con dos campos:
  1. **"Token de puerta de enlace"** ← **ESTE es el que usa** (auth.mode = `token`).
  2. **"Contraseña (no se almacena)"** ← opcional, NO está configurada.
- **NO es el login `admin`/`.htpasswd`** del "Centro de Mando". Son DOS cosas distintas:
  - `auth_basic` (admin) → protege otras rutas del `:80`.
  - **Token del gateway** → protege `/claw`.
- **Comando para ver el token** (en la terminal del VPS):
  ```bash
  openclaw gateway auth-token --show
  ```
  ⚠️ El token **NUNCA se pega en el chat**. Se copia del terminal y se pega directo en el navegador.

## 🔢 LOS PUERTOS (mapa completo, verificado)

| Puerto | Escucha en | Qué es | ¿Público? |
|---|---|---|---|
| `:80` | 0.0.0.0 | **nginx** → `/claw/` (Control UI), `/mundo-animal/`, otras rutas | ✅ SÍ |
| `:22` | 0.0.0.0 | SSH | ✅ SÍ |
| `:18789` | 127.0.0.1 (loopback) | **Gateway de OpenClaw (Claw)** — el proceso node real | ❌ NO (solo interno) |
| `:3080` | 127.0.0.1 (loopback) | **DeepSeek Harness** (panel APARTE, no es Claw) | ❌ NO (solo interno) |
| `:8080` | 0.0.0.0 | nginx → Omniroute | ❌ bloqueado por firewall |
| `:8081` | 0.0.0.0 | nginx → Control UI (config vieja) | ❌ **BLOQUEADO por Melbicom** |

## ⛔ REGLAS DE ORO (no olvidar)

1. **Melbicom bloquea TODO excepto `:80` y `:22`.** Cualquier otro puerto da 200 desde dentro pero NO llega desde internet. **`curl localhost` MIENTE.**
2. **`:8081` está muerto** — no volver a usarlo. La buena es `/claw/` en `:80`.
3. **Probar SIEMPRE desde fuera**, no desde el VPS:
   ```bash
   curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" http://162.247.153.98/claw/
   ```
4. **Al gateway NO se le inyectan headers de proxy** (`X-Real-IP`/`X-Forwarded-For`) — tiene `trustedProxies: ['127.0.0.1','::1']` y **rechaza (403 `proxy_attribution_required`)** cadenas que no cuadran. Conexión limpia desde loopback = 200.
5. **El gateway se reinicia SOLO con `openclaw gateway restart`.** ❌ NUNCA usar `nohup openclaw gateway ...` — ese era el parche de emergencia viejo y ahora crearía DOS gateways chocando.
6. **Es un servicio systemd de USUARIO** → se consulta con `systemctl --user`:
   ```bash
   systemctl --user status openclaw-gateway.service
   ```

## 🆘 RESCATE RÁPIDO (si el CEO dice "no entra")

1. **¿El gateway está vivo?**
   ```bash
   systemctl --user is-active openclaw-gateway.service   # → active
   curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0" http://162.247.153.98/claw/
   ```
2. **¿nginx sirve `/claw`?** Revisar `/etc/nginx/sites-available/dsh`, bloque `location /claw` → `proxy_pass http://127.0.0.1:18789`.
3. **¿403 `proxy_attribution_required`?** → quitar headers de proxy en ese `location`. `nginx -t && systemctl reload nginx`.
4. **¿Pide token y no lo tiene?** → `openclaw gateway auth-token --show`.
5. **¿Se cayó el gateway?** → `openclaw gateway restart` (NO `nohup`).

## 🔧 CONFIG CLAVE (openclaw.json → gateway)

- `auth.mode`: **`token`** (el token está guardado como **SecretRef**, blindado — el instalador no lo pisa).
- `bind`: `loopback`.
- `trustedProxies`: `['127.0.0.1', '::1']`.
- `basePath`: configurado como `/claw` para el Control UI.
- ⚠️ `basePath` **NO se aplica en caliente** → su cambio exige reiniciar el gateway (corta la sesión de Claw un momento; vuelve solo).

## 📌 Identificadores

- **IP pública del VPS:** `162.247.153.98` (hermes-vps, Melbicom KVM-2-US).
- **Zona horaria:** VPS en UTC; CEO en America/Caracas (GMT-4) → restar 4h.
