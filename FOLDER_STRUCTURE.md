# Folder Structure

Sitio simple: sin backend ni lógica compleja. La estructura se mantiene plana y chica.

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.css
│   ├── Card/
│   │   ├── Card.tsx
│   │   └── Card.css
│   └── ...
├── hooks/            (solo si hacen falta)
│   └── useXxx.ts
├── assets/           imágenes, íconos
├── App.tsx
├── main.tsx
└── index.css         variables y estilos globales (ver DESIGN.md)
```

## Reglas

- **Un componente, una carpeta.** Cada carpeta de `components/` lleva su `.tsx` y su `.css`, así no quedan archivos sueltos.
- **Nombres en PascalCase** para carpetas y archivos de componentes (`Button/Button.tsx`).
- **CSS por componente.** Usa las variables `--rc-*` de `index.css` en vez de valores fijos.
- **`hooks/`** solo se crea si aparece un hook. Se espera que sean pocos. Nombres con prefijo `use` (`useXxx.ts`).
- **`index.css`** queda para variables, tipografía y estilos globales. Nada específico de un componente.
- **`assets/`** para imágenes y SVG importados desde el código.
