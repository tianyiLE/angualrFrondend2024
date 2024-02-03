import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users= [
    {
      nom: 'Peter',
      role: 'user',
      password: '123456'
    },
    {
      nom: 'Peter',
      role: 'admin',
      password: '12345678'
    }
  ]
  currentUser:any = null;
  loggedIn = false

  constructor() { }

  logIn() {
    this.loggedIn = true
  }

  logInByNomEtPWD( role:string, nom: string, password: string) {
    const user = this.users.find(user => user.role === role && user.nom === nom && user.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
    } else {
      alert("Invalid credentials");
    }
  }
  

  logOut() {
    this.loggedIn = false
  }

  isLogged() {
    return this.loggedIn;
  }

  isAdmin() {
    return this.loggedIn && this.currentUser && this.currentUser.role === 'admin';
    // const isUserAdmin = new Promise(
    //   (resolve, reject) => {
    //     resolve(this.loggedIn)
    //   }
    // )
    // return isUserAdmin
  }
}
