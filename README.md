# Cayo Henrique — Portfólio

Portfólio pessoal de Cayo Henrique, desenvolvedor em formação focado em Python, Linux, automação e criação de ferramentas.

O projeto é predominantemente estático e foi construído com Astro, CSS e JavaScript puro. O design e o conteúdo preservam a identidade do portfólio original: técnico, independente, direto e sem exagerar a experiência profissional.

## Tecnologias

- Astro
- HTML semântico
- CSS responsivo, sem framework visual
- JavaScript puro
- API pública do GitHub para listar repositórios

## Desenvolvimento local

Requisitos: Node.js 18.17 ou superior e npm.

```bash
npm install
npm run dev
```

Depois, acesse `http://localhost:4321`.

## Build e preview

```bash
npm run build
npm run preview
```

O build está configurado como estático e gera a pasta `dist/`.

## Deploy na Vercel

1. Suba este projeto para um repositório no GitHub.
2. Importe o repositório na Vercel.
3. Selecione Astro como framework, caso a detecção automática não aconteça.
4. Use `astro build` como comando de build e `dist` como diretório de saída.
5. Publique. Os próximos pushes podem disparar deploys automáticos.

O projeto não usa servidor próprio, SSR, backend ou variáveis de ambiente obrigatórias.

## Estrutura

```text
.
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Projects.astro
│   │   ├── Services.astro
│   │   └── Technologies.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   └── main.js
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── README.md
```

## GitHub e projetos

O perfil oficial usado pelo site é [github.com/cayorosa093-drop](https://github.com/cayorosa093-drop).

A seção “Outros projetos” consulta a API pública `https://api.github.com/users/cayorosa093-drop/repos` diretamente no navegador, sem token. A consulta possui estado de carregamento e fallback caso o GitHub esteja indisponível. O UniDesk aponta diretamente para `cayorosa093-drop/unidesck`. O Flash-Lite permanece sem URL até que exista um repositório público confirmado para ele.

O contato por e-mail usa `cayo.h093@proton.me`.
