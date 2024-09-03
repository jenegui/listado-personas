import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  token: string | undefined;

  constructor(private router: Router) {
    const firebaseConfig = {
      apiKey: "AIzaSyBPrj5VSUwjikodO2CFbV73dZh1Je30BBU",
      authDomain: "listado-personas-c82c0.firebaseapp.com",
    };

    initializeApp(firebaseConfig);
  }

  login(email: string, password: string): void {
    if (!email || !password) {
      console.error('Email or password is missing');
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(response => {
        return response.user.getIdToken();
      })
      .then(token => {
        this.token = token;
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error en el login:', error);
      });
  }

  getToken(): string | undefined {
    return this.token;
  }

  isAuntenticated(){
    return this.token != null;
  }

  logout(): void {
    console.log("de aqui");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.token = undefined;
        this.router.navigate(['/login']); // Redirigir al usuario a la página de login
        console.log('Sesión cerrada con éxito');
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }
}
