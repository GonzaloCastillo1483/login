import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
 
  username: string = ''
  password: string = ''
  errorMessage: string = '';
  successMessage: string='';
  OnClick() {
    console.log('hola');
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      this.successMessage = '';
      return;
    }
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log(response);
        
        
        this.successMessage = 'Credenciales correctas! Redirigiendo...';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);  
      },
      error => {
        console.error(error);
        this.errorMessage = 'Error al iniciar sesión: ' + (error.error.message || error.statusText);
        this.successMessage='';
      }
    );
  }


}
