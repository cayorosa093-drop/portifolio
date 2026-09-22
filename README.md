# Cayo Henrique — Portfólio

Portfólio pessoal estático de Cayo Henrique, desenvolvedor em formação focado em Python, Linux, automação e criação de ferramentas.

## Objetivo

Apresentar o perfil, os serviços possíveis, projetos próprios e o código público disponível no GitHub, com uma experiência rápida e responsiva.

## Tecnologias

- HTML semântico
- CSS responsivo, sem framework
- JavaScript puro
- API pública do GitHub para listar repositórios

## Executar localmente

O projeto não precisa de dependências ou build. Como o navegador bloqueia algumas requisições quando arquivos são abertos diretamente, sirva a pasta com um servidor HTTP local:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Build

Não há etapa de build: os arquivos prontos para publicação são `index.html`, `css/`, `js/` e `public/`.

## Deploy

### Vercel

1. Suba este projeto para um repositório no GitHub.
2. Importe o repositório na Vercel.
3. Mantenha o preset como projeto estático, sem comando de build e sem diretório de saída personalizado.
4. Publique. A Vercel fará novos deploys a cada push.

### GitHub Pages ou Cloudflare Pages

Publique a raiz do projeto como site estático. Não há backend ou variáveis de ambiente obrigatórias.

## Estrutura

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── public/
│   └── favicon.svg
└── README.md
```

## Observações

- A lista de “Outros projetos” usa `https://api.github.com/users/cayorosa093-drop/repos` no navegador, sem token.
- Os links dos projetos em destaque começam no perfil de repositórios e são atualizados automaticamente quando a API encontra os repositórios `UniDesk` e `Flash-Lite`.
- O e-mail permanece como placeholder até que um endereço seja definido.
