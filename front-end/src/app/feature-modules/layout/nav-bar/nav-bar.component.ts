import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router) {}


  onRegister() {
    this.router.navigate(['/register']);
  }
  viewCompany() {
    this.router.navigate(['/view-company'])
  }
  viewEquipment(){
    this.router.navigate(['/view-equipment']);
  }
}
