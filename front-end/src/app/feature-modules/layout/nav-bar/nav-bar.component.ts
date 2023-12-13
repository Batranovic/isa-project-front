import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { UserService } from 'src/app/infrastructure/auth/user.service';
import { User } from 'src/app/infrastructure/model/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User | undefined;
  constructor(private router: Router, private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }
  
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
  

  logout():void {
    this.authService.logout();
  }
}
