# Guía de Despliegue

## Opción 1: Frontend en Vercel + Backend en Railway (RECOMENDADO)

### Paso 1: Desplegar Backend en Railway

1. Ve a [railway.app](https://railway.app) y crea una cuenta
2. Click en "New Project" → "Deploy from GitHub repo"
3. Sube solo estos archivos a un repo separado:
   - `package.json` (solo con json-server)
   - `db.json`
   - Crea `server.js`:

```js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
```

4. En Railway, agrega las variables de entorno:
   - `PORT`: 3001

5. Railway te dará una URL como: `https://tu-app.railway.app`

### Paso 2: Actualizar frontend con URL del backend

En `src/pages/Home.jsx`, reemplaza `http://localhost:3001` con:
```js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

Crea archivo `.env.production`:
```
VITE_API_URL=https://tu-app.railway.app
```

### Paso 3: Desplegar Frontend en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará Vite automáticamente
5. Deploy!

## Opción 2: Todo en Vercel con Vercel Functions (más complejo)

Necesitarías crear funciones serverless en `/api` folder y una base de datos real (no JSON Server).

## Opción 3: Solo Frontend (sin backend)

Si solo quieres demostrar que funciona:
1. La app funciona 100% con almacenamiento local
2. Solo sube el frontend a Vercel
3. Todo funcionará offline perfectamente

Para desarrollo local, sigue usando:
```bash
npm run backend  # Terminal 1
npm run dev      # Terminal 2
```