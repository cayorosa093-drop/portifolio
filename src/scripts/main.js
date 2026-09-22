const GITHUB_USERNAME = 'cayorosa093-drop';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
const featuredProjectNames = ['unidesk', 'flash-lite'];

const normalizeName = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const backToTop = document.querySelector('[data-back-to-top]');

const updateScrollState = () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
  backToTop?.classList.toggle('visible', window.scrollY > 520);
};

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('is-open');
  siteNav?.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
  const label = menuToggle.querySelector('.sr-only');
  if (label) label.textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.classList.remove('is-open');
    siteNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const repoList = document.querySelector('#repo-list');
const repoStatus = document.querySelector('#repo-status');
const repoSort = document.querySelector('#repo-sort');
let repositories = [];

const formatDate = (dateString) => {
  try {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateString));
  } catch {
    return 'data indisponível';
  }
};

const makeStat = (label, value) => {
  const item = document.createElement('span');
  item.textContent = `${label} ${value}`;
  return item;
};

const createRepoCard = (repo) => {
  const article = document.createElement('article');
  article.className = 'repo-card';

  const link = document.createElement('a');
  link.href = repo.html_url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Abrir o repositório ${repo.name} no GitHub`);

  const top = document.createElement('div');
  top.className = 'repo-top';
  const name = document.createElement('span');
  name.className = 'repo-name';
  name.textContent = repo.name;
  top.appendChild(name);
  link.appendChild(top);

  const description = document.createElement('p');
  description.className = 'repo-description';
  description.textContent = repo.description || 'Repositório sem descrição definida.';
  link.appendChild(description);

  const stats = document.createElement('div');
  stats.className = 'repo-stats';
  stats.appendChild(makeStat('★', repo.stargazers_count));
  stats.appendChild(makeStat('⌁', repo.language || 'código'));
  stats.appendChild(makeStat('↻', formatDate(repo.updated_at)));
  link.appendChild(stats);

  article.appendChild(link);
  return article;
};

const renderRepositories = () => {
  if (!repoList) return;
  const sortMode = repoSort?.value || 'updated';
  const sorted = [...repositories].sort((a, b) => {
    if (sortMode === 'stars') return b.stargazers_count - a.stargazers_count;
    if (sortMode === 'name') return a.name.localeCompare(b.name);
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
  const visibleRepositories = sorted.slice(0, 9);

  repoList.replaceChildren();
  if (!visibleRepositories.length) {
    const empty = document.createElement('p');
    empty.className = 'repo-loading';
    empty.textContent = 'Nenhum outro repositório público para mostrar ainda.';
    repoList.appendChild(empty);
    return;
  }
  visibleRepositories.forEach((repo) => repoList.appendChild(createRepoCard(repo)));
};

const resolveFeaturedProjects = (repos) => {
  featuredProjectNames.forEach((projectName) => {
    const match = repos.find((repo) => normalizeName(repo.name) === normalizeName(projectName));
    const link = document.querySelector(`[data-project-link="${projectName}"]`);
    if (match && link) link.href = match.html_url;
  });
};

const loadRepositories = async () => {
  if (!repoList) return;
  try {
    const response = await fetch(GITHUB_API_URL, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub respondeu com ${response.status}`);
    const repos = await response.json();
    const publicRepos = repos.filter((repo) => !repo.fork);
    resolveFeaturedProjects(publicRepos);
    repositories = publicRepos.filter((repo) => !featuredProjectNames.includes(normalizeName(repo.name)));
    renderRepositories();
    if (repoStatus) repoStatus.textContent = `Atualizado a partir de github.com/${GITHUB_USERNAME}`;
  } catch (error) {
    repoList.replaceChildren();
    const fallback = document.createElement('p');
    fallback.className = 'repo-loading';
    fallback.textContent = 'Não foi possível carregar agora. Veja todos os repositórios no GitHub.';
    repoList.appendChild(fallback);
    if (repoStatus) repoStatus.textContent = `Fonte: github.com/${GITHUB_USERNAME}`;
    console.info('A lista de repositórios do GitHub está indisponível no momento.', error);
  }
};

repoSort?.addEventListener('change', renderRepositories);
const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();
loadRepositories();
