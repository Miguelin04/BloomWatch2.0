🌿 BloomWatch – Ejecución Local del Prototipo

Este documento explica cómo instalar y ejecutar el prototipo localmente utilizando Vite + React. El objetivo es proporcionar una experiencia rápida, clara y sin fricción para desarrolladores o testers.

🚀 Ejecución local del prototipo
🔧 Prerrequisitos

Antes de iniciar, asegúrate de tener instalado:

Node.js 18+ (recomendado 18.x o 20.x)

npm (incluido con Node.js)

Verifica tus versiones con:

node -v
npm -v
________________________________________
▶️ Cómo ejecutar BloomWatch en tu PC
1️⃣ Clonar el repositorio
git clone https://github.com/Miguelin04/BloomWatch2.0h
cd BloomWatch2.0h
________________________________________
2️⃣ Instalar dependencias
npm install
________________________________________
3️⃣ Configurar variables de entorno (si aplica)

Si el proyecto requiere claves (por ejemplo: GEMINI_API_KEY), crea un archivo .env.local en la raíz del proyecto:

GEMINI_API_KEY=tu_valor_aqui
# Agrega aquí otras variables necesarias
________________________________________
4️⃣ Ejecutar el servidor de desarrollo
npm run dev

Luego abre tu navegador en la URL que mostrará la terminal (generalmente):

http://localhost:5173/
________________________________________
5️⃣ Compilar versión de producción
npm run build

6️⃣ Previsualizar la build generada
npm run preview

🛠️ Tecnologías utilizadas

React

Vite (entorno ultrarrápido para desarrollo)

JavaScript / JSX

TailwindCSS (estilos utilitarios)

Node.js + npm para la ejecución local

📁 Scripts disponibles (package.json)

dev → inicia Vite en modo desarrollo

build → genera la build optimizada

preview → previsualiza la build de producción
________________________________________
🧯 Solución rápida de problemas

Error en npm install: confirma tu versión de Node.js (node -v).

Puerto ocupado: ejecuta manualmente

npx vite --port 3000

Variables de entorno no cargan: revisa que .env.local esté en la raíz y sin caracteres extraños.
________________________________________
📌 Notas finales

Este prototipo es principalmente una interfaz visual, por lo que algunas funciones pueden no incluir lógica completa.

Revisa package.json si deseas conocer dependencias o scripts adicionales.
