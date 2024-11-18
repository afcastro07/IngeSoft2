import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.userService.loginUser(credentials).subscribe({
      next: (response: any) => {
        if (response.success) {
          const user = {
            ...response.user,
            id: response.user.id.toString()
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        } else {
          alert('Credenciales inválidas');
        }
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error en el login: ' + (error.error?.message || 'Error desconocido'));
      }
    });
  }
}
