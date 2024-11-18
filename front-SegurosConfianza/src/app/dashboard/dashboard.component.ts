import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string = '';
  userRole: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        this.router.navigate(['/login']);
        return;
      }

      const user = JSON.parse(userStr);
      this.userRole = user.role;

      this.userService.getDashboard().subscribe({
        next: (response: any) => {
          console.log('Dashboard response:', response);
          this.message = response.message;
          this.loading = false;
          this.error = '';
        },
        error: (error) => {
          console.error('Dashboard error:', error);
          this.error = 'Error al cargar el dashboard';
          this.loading = false;
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
    } catch (error) {
      console.error('Error en dashboard:', error);
      this.router.navigate(['/login']);
    }
  }
}
