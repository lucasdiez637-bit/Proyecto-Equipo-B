# Contributing / Pull Requests

Flujo simple: **todo entra a `main` por Pull Request**. No hay rama `dev`.

## Ramas

Las ramas deben seguir buenas prácticas: nombre corto, en minúsculas, con guiones, y con el ID del ticket de Jira o Trello.

Formato: `<tipo>/<ID-del-ticket>-<descripcion-corta>`

| Tipo | Cuándo |
|---|---|
| `feature/` | Funcionalidad nueva |
| `fix/` | Corrección de un bug |
| `chore/` | Mantenimiento, configuración, dependencias, limpieza |

Ejemplos:

```
feature/RC-12-hero-section
fix/RC-31-checkout-button-overflow
chore/RC-40-remove-vite-boilerplate
```

- Una rama = un ticket.
- Salen siempre de `main` actualizado.
- Se borran después de mergear.

## Commits

- **En inglés.**
- Siguen [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<scope opcional>): <description>`
- Tipos: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `build`, `ci`.
- Descripción en imperativo, minúscula y sin punto final.
- Commits chicos y con un solo propósito.

Ejemplos:

```
feat(hero): add main headline and call to action
fix(checkout): prevent price from overflowing on mobile
chore: remove unused vite assets
docs: add design style guide
```

## Mantener la rama actualizada: solo REBASE

Para traer los cambios nuevos de `main` a tu rama se usa **rebase**. Nada de merge.

```bash
git pull --rebase origin main
```

- Nunca hagas `git merge main` ni `git pull` sin `--rebase`.
- Si hay conflictos, se resuelven durante el rebase (`git rebase --continue`).

## Pull Requests

- Destino: **`main`**.
- **No se aceptan PRs con commits de merge.** Si los tiene, hay que rehacer la rama con rebase.
- Título en inglés, con formato Conventional Commits (ej. `feat(hero): add main headline`).
- **Descripción en inglés**, simple: qué hace el PR, sin detalles técnicos. Alcanza con un par de líneas.
- Un PR = un ticket. PRs chicos, fáciles de revisar.

Plantilla de descripción:

```md
## What does this PR do?
<Short, non-technical description of what it does>

## Ticket
<Jira/Trello link or ID>
```

## Antes de abrir el PR

- [ ] La rama está rebaseada sobre el último `main`.
- [ ] No hay commits de merge.
- [ ] Los commits siguen Conventional Commits y están en inglés.
- [ ] `npm run lint` y `npm run build` pasan sin errores.
- [ ] Se probó en el navegador (escritorio y celular).
- [ ] No quedan `console.log`, código comentado ni archivos que no corresponden.

## Revisión y merge

- Los comentarios de la revisión se resuelven antes del merge.
