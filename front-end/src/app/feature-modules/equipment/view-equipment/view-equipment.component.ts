import { Component } from '@angular/core';
import { Equipment } from '../model/equipment.model';
import { EquipmentService } from '../equipment.service';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.css']
})
export class ViewEquipmentComponent {
  equipments: Equipment[] = [];

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.getEquipments();
  }

  getEquipments(): void {
    this.equipmentService.getEquipmentss().subscribe(
      (data: any[]) => {
        this.equipments = data;
      },
      (error) => {
        console.error('Error fetching equipments:', error);
      }
    );
  }
}
