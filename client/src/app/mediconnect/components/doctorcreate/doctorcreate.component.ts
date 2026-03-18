import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediConnectService } from '../../services/mediconnect.service';
import { Doctor } from '../../models/Doctor';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctorcreate.component.html',
  styleUrls: ['./doctorcreate.component.scss']
})
export class DoctorCreateComponent implements OnInit {
 
  doctorForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
 
  constructor(
    private formBuilder: FormBuilder,
    private mediConnectService: MediConnectService
  ) {}
 
  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      specialty: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      yearsOfExperience: ['', [Validators.required, Validators.min(1)]]
    });
  }
 
  onSubmit(): void {
    if (this.doctorForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      this.successMessage = null;
      return;
    }
 
    const doctor: Doctor = this.doctorForm.value;
 
    this.mediConnectService.addDoctor(doctor).subscribe({
      next: () => {
        this.successMessage = 'Doctor created successfully!';
        this.errorMessage = null;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Failed to create doctor.';
        this.successMessage = null;
      }
    });
  }
 
  resetForm(): void {
    this.doctorForm.reset();
    this.successMessage = null;
    this.errorMessage = null;
  }
}