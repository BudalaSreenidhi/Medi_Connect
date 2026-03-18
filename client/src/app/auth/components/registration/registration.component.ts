
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      fullName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.errorMessage = 'Invalid form';
      return;
    }

    this.authService.createUser(this.registrationForm.value).subscribe(() => {
      this.successMessage = 'Registration successful';
    });
  }
}
