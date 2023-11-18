import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEquipmentComponent } from './view-equipment/view-equipment.component';



@NgModule({
  declarations: [
    ViewEquipmentComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ViewEquipmentComponent
  ]
})
export class EquipmentModule { }
