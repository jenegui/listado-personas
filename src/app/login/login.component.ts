import { Component } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService) {}

  onLogin(): void {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password);
    } else {
      console.error('Email and password are required');
    }
  }
}
