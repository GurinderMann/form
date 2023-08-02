import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Login } from '../login';

@Component({
  selector: 'app-driven',
  templateUrl: './driven.component.html',
  styleUrls: ['./driven.component.scss']
})
export class DrivenComponent {
  formData: Login = {
    password: '',
    email: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit() {
    this.authService.login(this.formData.email, this.formData.password).subscribe(
      response => {
        console.log(response);

        this.router.navigate(['/user']);
      },
      error => {
        console.error(error);

      }
    );
  }
}
