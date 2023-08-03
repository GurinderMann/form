import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[] = [];
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  constructor(private userService: UserService,  private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', command: () => this.navigateToHomePage() },
      { label: 'Users', icon: 'pi pi-fw pi-user'  },
      { label: 'Register',  command: () => this.RegisterPage() }
    ];

    this.activeItem = this.items[1];
  }
  navigateToHomePage() {
    this.router.navigate(['home']);
  }
  RegisterPage(){
    this.router.navigate(['register']);
  }
}

