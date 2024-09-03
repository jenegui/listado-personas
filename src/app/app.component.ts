import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  titulo = 'Listado de Personas';
  
  constructor(private loginService: LoginService){}

    // ngOninit(): void {
    //   initializeApp({
    //     apiKey: "AIzaSyBPrj5VSUwjikodO2CFbV73dZh1Je30BBU",
    //     authDomain: "listado-personas-c82c0.firebaseapp.com",
    //   })
    // }
    
    isAuntenticated(){
      return this.loginService.isAuntenticated();
    }

    onLogout(): void {
      this.loginService.logout();
    }

}
