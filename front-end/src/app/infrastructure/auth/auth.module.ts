import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivationLinkComponent } from './activation-link/activation-link.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    RegistrationComponent,
    ActivationLinkComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    RegistrationComponent,
    ActivationLinkComponent,
    LoginComponent
  ]
})
export class AuthModule { }
