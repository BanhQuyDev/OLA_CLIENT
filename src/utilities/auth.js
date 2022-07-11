class Auth {
  constructor() {
    this.authenticated = false;
    this.userRole = "none"
    console.log(this.authenticated)
  }

  login(cb, role, email) {
    // this.authenticated = true;
    // this.userRole = role
    localStorage.setItem('login', 1)
    localStorage.setItem('userEmail', email)
    localStorage.setItem('role', role)
    cb();
  }

  logout(cb) {
    // this.authenticated = false;
    // this.userRole = "none"
    localStorage.removeItem('login');
    localStorage.removeItem('userEmail')
    localStorage.removeItem('role');
    cb();
  }

  isAuthenticated() {
    // console.log(this.authenticated)
    // return this.authenticated;
    console.log(localStorage.getItem('login'))
    console.log(localStorage.getItem('role'))
    return localStorage.getItem('login')
  }

  whichRole() {
    // console.log(this.userRole)
    // return this.userRole;
    return localStorage.getItem('role')
  }
}

export default new Auth();
