import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediConnectService } from '../../services/mediconnect.service';
import { Patient } from '../../models/Patient';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-patient-create',
  templateUrl: './patientcreate.component.html',
  styleUrls: ['./patientcreate.component.scss']
})
export class PatientCreateComponent implements OnInit {
 
  patientForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
 
  constructor(
    private formBuilder: FormBuilder,
    private mediConnectService: MediConnectService
  ) {}
 
  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
 
  onSubmit(): void {
    if (this.patientForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      this.successMessage = null;
      return;
    }
 
    const patient: Patient = this.patientForm.value;
 
    this.mediConnectService.addPatient(patient).subscribe({
      next: () => {
        this.successMessage = 'Patient created successfully!';
        this.errorMessage = null;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Failed to create patient.';
        this.successMessage = null;
      }
    });
  }
 
  resetForm(): void {
    this.patientForm.reset();
    this.successMessage = null;
    this.errorMessage = null;
  }
}