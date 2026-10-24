# 🎟️ Landing · Workshop "¿Por dónde empiezo a programar?"

Landing para vender las entradas del workshop de Rolling Code School.
Scrum Professional Bootcamp · Comisión 13P.

## 🌐 Demo

[Ver la página online](https://proyecto-equipo-b-web-projects15.vercel.app/)

## 📸 Captura

![Captura](/src/assets/Landing%20con%20compra%20de%20entradas.png)

## 🛠️ Tecnologías

React · TypeScript · Vite · Bootstrap 5.3 · Git y GitHub

## 🚀 Cómo verlo en local

1.Copiar la URL del repositorio: Ingresar a GitHub y copiar la URL del repositorio que se desea clonar.

2.Abrir Git Bash: Ubicarse en la carpeta donde se guardará el proyecto.

3.Clonar el repositorio: En Git Bash, ejecutar el siguiente comando:

git clone https://github.com/lucasdiez637-bit/Proyecto-Equipo-B.git

4.Abrir el proyecto en Visual Studio Code (VS Code): Una vez finalizada la clonación, abrir la carpeta del repositorio descargado en el editor.

5.Abrir una terminal en el proyecto: Si la terminal no se encuentra dentro de la carpeta del repositorio, ejecutar:

cd Proyecto-Equipo-B

Video de referencia: https://youtube.com/shorts/xUkAM51Hp88?si=3vUWVwdGWdJSciLG
Verificar la ubicación: Ejecutar el comando ls para comprobar que se está dentro de la carpeta del proyecto. Deberían aparecer archivos y carpetas como package.json, src o public, según la estructura del repositorio.

6.Instalar las dependencias: En la terminal, ejecutar:

npm install
También se puede utilizar npm i, ya que ambos comandos cumplen la misma función.

7.Finalizar la instalación: Esperar a que termine de instalar las dependencias.

8.En la terminal de bash ejecutar el comando:

npm run dev

9.Copiar y pegar el link en el navegador

## 👥 Equipo

- Lucas Diez
- Marisol Lamas

**Scrum Masters:** Marisol Lamas · Juan Barrientos

## 📋 Tablero

[Ver tablero en Trello](https://trello.com/b/KcWIKx8g/b-scrum-proyecto-web-grupo-b)































# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
