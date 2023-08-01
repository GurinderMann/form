import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  myForm: FormGroup;
  successMessage: string = ""
  errorMessage: string =""

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
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

      console.log(this.myForm.value);
      this.myForm.reset()
      this.successMessage = 'Registered successfully!';
      this.errorMessage = '';
    } else {
      this.myForm.markAllAsTouched();
      this.errorMessage = 'Pleas fill all required fields.';
    }
  }





}
