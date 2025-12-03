
# Bloomwatch

Instrucciones para ejecutar este proyecto localmente.

**Resumen rápido:** la app usa Vite + React. Los scripts disponibles están en `package.json`: `dev`, `build` y `preview`.

**Requisitos recomendados**
- Node.js >= 18 (recomendado 18.x o 20.x)
- npm (incluido con Node.js)

## Configuración y ejecución (PowerShell)

1. Clona el repositorio (si aún no lo has hecho) y entra en la carpeta del proyecto:

```powershell
git clone https://github.com/Miguelin04/BloomWatch2.0h
```
2. Instala dependencias:

```powershell
npm install
```
3. Variables de entorno

- Si la app requiere claves (por ejemplo `GEMINI_API_KEY`), crea un archivo `.env.local` en la raíz del proyecto y añade la variable. Ejemplo:

```text
GEMINI_API_KEY=tu_valor_aqui
# Otras variables que necesite la app
```

4. Ejecutar en modo desarrollo (Vite):

```powershell
npm run dev
```

Abre el navegador en la dirección que muestre Vite (por defecto `http://localhost:5173`).

5. Compilar para producción:

```powershell
npm run build
```

6. Previsualizar build de producción:

```powershell
npm run preview
```

## Scripts (desde `package.json`)
- `dev`: inicia Vite en modo desarrollo.
- `build`: genera la versión optimizada para producción.
- `preview`: arranca un servidor para previsualizar la build.

## Solución de problemas rápida
- Si `npm install` falla: verifica la versión de Node.js con `node -v`.
- Si el puerto de Vite está en uso: Vite propondrá otro puerto o puedes forzar uno con `npx vite --port 3000`.
- Si faltan variables de entorno: revisa que `.env.local` esté en la raíz y no contenga errores.

## Notas
- Revisa `package.json` para ver dependencias y scripts.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
