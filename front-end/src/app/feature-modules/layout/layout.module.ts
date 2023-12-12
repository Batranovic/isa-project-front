import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';



@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ], 
  exports: [
    HomeComponent,
    NavBarComponent,

  ]
})
export class LayoutModule { }
