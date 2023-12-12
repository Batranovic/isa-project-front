import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './infrastructure/auth/auth.module';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { CompanyModule } from './feature-modules/company/company.module';
import { EquipmentModule } from './feature-modules/equipment/equipment.module';
import { ViewProfileComponent } from './feature-modules/view-profile/view-profile.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AngularMaterialModule } from './angular-material/angular-material.module';
@NgModule({
  declarations: [
    AppComponent,
    ViewProfileComponent
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
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
