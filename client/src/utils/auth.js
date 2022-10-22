import decode from 'jwt-decode';


class AuthService {
 
  loggedIn() {
    const token = this.getToken() || '';
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      localStorage.removeItem('band')
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
    
  }


getProfile() {
    const token = localStorage.getItem('id_token')

    if(this.loggedIn()){
      return decode(token);
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('band')
  }
}

export default new AuthService();
