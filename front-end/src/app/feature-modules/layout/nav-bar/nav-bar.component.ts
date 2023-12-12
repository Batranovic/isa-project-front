import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from 'src/app/infrastructure/auth/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}


  viewCompany() {
    this.router.navigate(['/view-company'])
  }
  viewEquipment(){
    this.router.navigate(['/view-equipment']);
  }
  logIn(){
    this.router.navigate(['/login']);
  }

  
  hasSignedIn() {
    return !!this.userService.currentUser;
  }
  
  userName() {
    const user = this.userService.currentUser;
    return user.firstName + ' ' + user.lastName;
  }
  logout() {
    this.authService.logout();
  }
}
