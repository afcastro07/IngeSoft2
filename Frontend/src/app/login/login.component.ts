import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}
  

  ngOnInit(): void {
    console.log("Abriendo pasarela de login");
  }

  onSubmit() {

    
  }


}