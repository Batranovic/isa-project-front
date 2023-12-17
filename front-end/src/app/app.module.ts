// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './infrastructure/auth/auth.module';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { CompanyModule } from './feature-modules/company/company.module';
import { EquipmentModule } from './feature-modules/equipment/equipment.module';
import { ViewProfileComponent } from './feature-modules/view-profile/view-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './infrastructure/auth/interceptor/TokenInterceptor';
import { DatePipe } from '@angular/common';
import { NewDatesComponent } from './feature-modules/new-dates/new-dates.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProfileComponent,
    NewDatesComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    CompanyModule,
    EquipmentModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
