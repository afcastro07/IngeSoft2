import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) { }

  register() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };
    this.userService.registerUser(userData).subscribe(response => {
      console.log(response);
    });
  }
}
