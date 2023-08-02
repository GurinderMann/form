import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  myForm: FormGroup;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder, private authSvc: AuthService) {
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

  ngOnInit() {}

  submit() {
    if (this.myForm.valid) {
      const { username, password, email } = this.myForm.value;

      this.authSvc.register(username, password, email).subscribe(
        response => {
          console.log(response);
          this.myForm.reset();
          this.successMessage = 'Registered successfully!';
          this.errorMessage = '';
        },
        error => {
          console.error(error);
          this.errorMessage = 'An error occurred during registration.';
          this.successMessage = '';
        }
      );
    } else {
      this.myForm.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields.';
    }
  }

}
