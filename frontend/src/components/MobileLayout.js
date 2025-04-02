import theme from '../styles/theme';

class MobileLayout {
  constructor() {
    this.currentRoute = '/';
    this.setupLayout();
    this.setupNavigation();
    this.setupHeader();
  }

  setupLayout() {
    const app = document.createElement('div');
    app.className = 'app';
    app.style.cssText = `
      max-width: ${theme.layout.maxWidth};
      margin: 0 auto;
      min-height: 100vh;
      background: ${theme.colors.background};
      padding-top: ${theme.layout.headerHeight};
      padding-bottom: calc(${theme.layout.bottomNavHeight} + ${theme.layout.safeArea});
    `;
    
    const content = document.createElement('main');
    content.id = 'main-content';
    content.style.cssText = `
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    `;

    app.appendChild(this.createHeader());
    app.appendChild(content);
    app.appendChild(this.createBottomNav());
    
    document.body.appendChild(app);
  }

  createHeader() {
    const header = document.createElement('header');
    header.className = 'app-header';
    header.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: ${theme.layout.headerHeight};
      background: ${theme.colors.surface};
      display: flex;
      align-items: center;
      padding: 0 ${theme.spacing.md};
      box-shadow: ${theme.shadows.sm};
      z-index: 100;
    `;

    const title = document.createElement('h1');
    title.textContent = 'Saúde Local';
    title.style.cssText = `
      margin: 0;
      font-size: ${theme.typography.sizes.lg};
      font-weight: ${theme.typography.weights.medium};
      color: ${theme.colors.text};
      flex: 1;
      text-align: center;
    `;

    header.appendChild(title);
    return header;
  }

  createBottomNav() {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    nav.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: ${theme.layout.bottomNavHeight};
      background: ${theme.colors.surface};
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-shadow: ${theme.shadows.md};
      z-index: 100;
      padding-bottom: ${theme.layout.safeArea};
    `;

    const navItems = [
      { icon: '🏠', label: 'Início', path: '/' },
      { icon: '📅', label: 'Agendar', path: '/appointments' },
      { icon: '🔍', label: 'Buscar', path: '/search' },
      { icon: '👤', label: 'Perfil', path: '/profile' }
    ];

    navItems.forEach(item => {
      const button = this.createNavButton(item);
      nav.appendChild(button);
    });

    return nav;
  }

  createNavButton(item) {
    const button = document.createElement('button');
    button.className = 'nav-button';
    button.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      border: none;
      background: none;
      padding: ${theme.spacing.xs};
      color: ${this.currentRoute === item.path ? theme.colors.primary : theme.colors.textSecondary};
      font-size: ${theme.typography.sizes.sm};
      cursor: pointer;
      transition: color 0.2s;
    `;

    const icon = document.createElement('span');
    icon.style.cssText = `
      font-size: ${theme.typography.sizes.xl};
      margin-bottom: ${theme.spacing.xs};
    `;
    icon.textContent = item.icon;

    const label = document.createElement('span');
    label.textContent = item.label;
    label.style.fontSize = theme.typography.sizes.xs;

    button.appendChild(icon);
    button.appendChild(label);

    button.addEventListener('click', () => this.navigate(item.path));

    return button;
  }

  setupNavigation() {
    window.addEventListener('popstate', () => {
      this.currentRoute = window.location.pathname;
      this.updateUI();
    });
  }

  navigate(path) {
    this.currentRoute = path;
    window.history.pushState({}, '', path);
    this.updateUI();
  }

  updateUI() {
    // Atualizar navegação ativa
    document.querySelectorAll('.nav-button').forEach(button => {
      const path = button.getAttribute('data-path');
      button.style.color = this.currentRoute === path ? 
        theme.colors.primary : 
        theme.colors.textSecondary;
    });

    // Atualizar título do header
    const title = document.querySelector('.app-header h1');
    switch(this.currentRoute) {
      case '/':
        title.textContent = 'Saúde Local';
        break;
      case '/appointments':
        title.textContent = 'Agendamentos';
        break;
      case '/search':
        title.textContent = 'Buscar';
        break;
      case '/profile':
        title.textContent = 'Perfil';
        break;
      default:
        title.textContent = 'Saúde Local';
    }
  }
}

export default MobileLayout;
