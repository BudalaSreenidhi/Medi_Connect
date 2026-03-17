import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  selectedRole: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }

  ngOnInit(): void {
    if (!this.registrationForm) this.initializeForm();
    this.registrationForm.get('role')?.valueChanges.subscribe(role => this.applyRoleValidators(role));
  }

  private initializeForm(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
      role: ['', [Validators.required]],
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      specialty: [''],
      yearsOfExperience: [''],
      dateOfBirth: [''],
      address: ['']
    });
  }

  onRoleChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedRole = select.value;
    this.applyRoleValidators(this.selectedRole);
  }

  private applyRoleValidators(role: string): void {
    const specialty = this.registrationForm.get('specialty') as AbstractControl;
    const yearsOfExperience = this.registrationForm.get('yearsOfExperience') as AbstractControl;
    const dateOfBirth = this.registrationForm.get('dateOfBirth') as AbstractControl;
    const address = this.registrationForm.get('address') as AbstractControl;

    specialty.clearValidators();
    yearsOfExperience.clearValidators();
    dateOfBirth.clearValidators();
    address.clearValidators();

    if (role === 'DOCTOR') {
      specialty.setValidators([Validators.required]);
      yearsOfExperience.setValidators([Validators.required, Validators.min(1)]);
    } else if (role === 'PATIENT') {
      dateOfBirth.setValidators([Validators.required]);
      address.setValidators([Validators.required, Validators.minLength(5)]);
    }

    specialty.updateValueAndValidity();
    yearsOfExperience.updateValueAndValidity();
    dateOfBirth.updateValueAndValidity();
    address.updateValueAndValidity();
  }

  onSubmit(): void {
    if (!this.registrationForm || this.registrationForm.invalid) {
      this.successMessage = null;
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }
    this.errorMessage = null;
    this.successMessage = 'Registration successful!';
  }
}
