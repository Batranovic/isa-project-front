import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Registration } from '../model/registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, this.emailValidator]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    companyInformation: new FormControl('', [Validators.required]),
    profession: new FormControl('', [Validators.required]),
  });

  register(): void {
    this.submitted = true;

    const registration: Registration = {
      name: this.registrationForm.value.name || "",
      surname: this.registrationForm.value.surname || "",
      email: this.registrationForm.value.email || "",
      password: this.registrationForm.value.password || "",
      confirmPassword: this.registrationForm.value.confirmPassword || "",
      phoneNumber: this.registrationForm.value.phoneNumber || "",
      city: this.registrationForm.value.city || "",
      country: this.registrationForm.value.country || "",
      companyInformation: this.registrationForm.value.companyInformation || "",
      profession: this.registrationForm.value.profession || "",
      isActive: false 
    };

    if (this.registrationForm.valid) {
        this.authService.register(registration).subscribe({
            next: () => {
                alert('Successfully created!');
                this.router.navigate(['home']);
            },
            error: (error) => {
                console.error('Registration error:', error);
                alert('Registration failed. Please check your inputs.');
            },
        });
    }
  }

  // Custom email validator function
emailValidator(control: FormControl): { [key: string]: boolean } | null {
  const email = control.value as string;

  if (!email || email.indexOf('@') === -1 || !email.endsWith('@gmail.com')) {
    return { invalidEmail: true };
  }

  return null;
}

}
