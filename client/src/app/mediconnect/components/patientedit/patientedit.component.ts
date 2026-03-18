import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediConnectService } from '../../services/mediconnect.service';
import { Patient } from '../../models/Patient';
import { User } from '../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-patient-edit',
  templateUrl: './patientedit.component.html',
  styleUrls: ['./patientedit.component.scss']
})
export class PatientEditComponent implements OnInit {
 
  patientForm!: FormGroup;
 
  successMessage: string | null = null;
  errorMessage: string | null = null;
 
  patientId!: number;
  userId!: number;
 
  patient!: Patient;
  user!: User;
 
  constructor(
    private formBuilder: FormBuilder,
    private mediConnectService: MediConnectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
 
    this.initializeForm();
    this.loadPatientDetails();
  }
 
  initializeForm(): void {
    this.patientForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]],
      dateOfBirth: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
 
  loadPatientDetails(): void {
    this.mediConnectService.getPatientById(this.patientId).subscribe({
      next: (p) => {
        this.patient = p;
 
        // Load user details
        this.mediConnectService.getUserById(p.patientId).subscribe({
          next: (u) => {
            this.user = u;
 
            // Patch form with patient + user info
            this.patientForm.patchValue({
              fullName: p.fullName,
              username: u.username,
              password: u.password,
              dateOfBirth: p.dateOfBirth,
              contactNumber: p.contactNumber,
              email: p.email,
              address: p.address
            });
          }
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load patient details.';
      }
    });
  }
 
  onSubmit(): void {
    if (this.patientForm.invalid) {
      this.errorMessage = 'Form is invalid.';
      return;
    }
 
    const updated: any = {
      patientId: this.patientId,
      fullName: this.patientForm.value.fullName,
      dateOfBirth: this.patientForm.value.dateOfBirth,
      contactNumber: this.patientForm.value.contactNumber,
      email: this.patientForm.value.email,
      address: this.patientForm.value.address
    };
 
    this.mediConnectService.updatePatient(updated).subscribe({
      next: () => {
        this.successMessage = 'Patient updated successfully!';
        this.errorMessage = null;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Failed to update patient.';
      }
    });
  }
}