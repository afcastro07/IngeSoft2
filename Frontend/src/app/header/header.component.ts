import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], 
})
export class HeaderComponent implements AfterViewInit {
  
    constructor() {}
  
    ngAfterViewInit(): void {
      //@ts-ignore
      const menuButton = document.getElementById('menu-toggle-mobile');
      //@ts-ignore
      const navbar = document.getElementById('navbar-sticky-mobile');
  
      if (menuButton && navbar) {
        menuButton.addEventListener('click', () => {
          navbar.classList.toggle('hidden');
        });
      }
    }
  }
  