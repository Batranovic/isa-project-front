import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../user.service';

interface DisplayMessage {
  msgType: string;
  msgBody: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  form!: FormGroup;
  submitted = false;
  notification!: DisplayMessage;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router,private route: ActivatedRoute, private userService: UserService){}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: any) => {
        this.notification = params as DisplayMessage;
      });
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }
  onSubmit() {
    this.notification;
    this.submitted = true;
  
    this.authService.login(this.form.value)
      .subscribe({
        next: data => {
          console.log(data);
          this.router.navigate(['/view-company']);
        },
        error: error => {
          console.log(error);
          this.submitted = false;
          this.notification = {msgType: 'error', msgBody: 'Incorrect username or password.'};
        }
      });

      
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
