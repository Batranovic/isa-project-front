import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './infrastructure/auth/auth.module';
import { LayoutModule } from './feature-modules/layout/layout.module';
import { AppRoutingModule } from './infrastructure/routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CompanyModule } from './feature-modules/company/company.module';
import { ViewCompanyComponent } from './feature-modules/company/view-company/view-company.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    CompanyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
