import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Login } from '../login';
import { MenuItem } from 'primeng/api';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-driven',
  templateUrl: './driven.component.html',
  styleUrls: ['./driven.component.scss']
})
export class DrivenComponent implements OnInit {
  formData: Login = {
    email: '',
    password: ''
  };

  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  messages: Message[] = [];
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Users', icon: 'pi pi-fw pi-user', command: () => this.navigateToUsersPage() },
      { label: 'Register',  command: () => this.RegisterPage() }
    ];

    this.activeItem = this.items[0];
  }

  submit() {
    this.authService.login(this.formData.email, this.formData.password).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/user']);
      },
      error => {
        console.error(error);
        this.messages = [ { severity: 'error', summary: 'Error', detail: 'Password o email errate controlla le credenziali e riprova' },];
      }
    );
  }

  navigateToUsersPage() {
    this.router.navigate(['users']);
  }
  RegisterPage(){
    this.router.navigate(['register']);
  }
}
