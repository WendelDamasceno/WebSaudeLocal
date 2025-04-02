import MobileLayout from './components/MobileLayout';
import './styles/global.css';

class App {
  constructor() {
    this.checkAuth();
    this.layout = new MobileLayout();
  }

  checkAuth() {
    const token = localStorage.getItem('token');
    const isGuestMode = localStorage.getItem('guestMode');

    if (!token && !isGuestMode) {
      window.location.href = '/login';
    }
  }
}

export default new App();
