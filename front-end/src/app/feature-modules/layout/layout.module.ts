import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    HomeComponent,
    NavBarComponent
  ]
})
export class LayoutModule { }
