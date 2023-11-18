import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivationLinkComponent } from './activation-link/activation-link.component';




@NgModule({
  declarations: [
    RegistrationComponent,
    ActivationLinkComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],
  exports: [
    RegistrationComponent,
    ActivationLinkComponent
  ]
})
export class AuthModule { }
