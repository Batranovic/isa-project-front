import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-activation-link',
  templateUrl: './activation-link.component.html',
  styleUrls: ['./activation-link.component.css']
})
export class ActivationLinkComponent {

  userId: number = 0; // Declare userId at the class level

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    // Extract user ID from the URL when the component initializes
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')! || 0; // '!' is the non-null assertion operator
      // You can store userId in a component property if needed
    });
  }

  activateAccount() {
    // Use the extracted userId or fetch it from wherever you stored it

    this.authService.activateUser(this.userId).subscribe(
      response => {
        alert('Account activated successfully');
        // Add any additional logic you want to execute after activation
      },
      error => {
        alert('Error activating account:');
      }
    );
  }
}
