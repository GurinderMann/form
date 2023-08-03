import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Message } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  myForm: FormGroup;
  successMessage: string = "";
  errorMessage: string = "";
  messages: Message[] = [];
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;
  constructor(private formBuilder: FormBuilder, private authSvc: AuthService,  private router: Router) {
    this.myForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passVerify: ['', Validators.required],
      genere: ['', Validators.required],
      profile: ['', Validators.required],
      bio: [''],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', command: () => this.navigateToHomePage() },
      {label: 'Users', icon: 'pi pi-fw pi-user', command: () => this.navigateToUsersPage() },
      { label: 'Register' }
    ];
    this.activeItem = this.items[2];
  }
  navigateToHomePage() {
    this.router.navigate(['home']);
  }
  navigateToUsersPage() {
    this.router.navigate(['users']);
  }
  submit() {
    if (this.myForm.valid) {
      const { username, password, email } = this.myForm.value;

      this.authSvc.register(username, password, email).subscribe(
        response => {
          console.log(response);
          this.myForm.reset();
          this.messages = [{ severity: 'success', summary: 'Success', detail: 'Registration completed' }];
          this.errorMessage = '';
        },
        error => {
          console.error(error);
          this.errorMessage = 'An error occurred during registration.';
          this.successMessage = '';
          this.messages = [];
        }
      );
    } else {
      this.myForm.markAllAsTouched();
      this.messages = [ { severity: 'error', summary: 'Error', detail: 'Assicurati che tuitti i campi siano stati compilati' },];
    }
  }

}
