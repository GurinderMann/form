import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { DrivenComponent } from './driven/driven.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: 'home', component: DrivenComponent },
  {path: 'register', component: ReactiveFormComponent},
  {path:'users',component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
