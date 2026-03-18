import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediConnectService } from '../../services/mediconnect.service';
import { Clinic } from '../../models/Clinic';
import { Patient } from '../../models/Patient';
import { Appointment } from '../../models/Appointment';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentCreateComponent implements OnInit {
 
  appointmentForm!: FormGroup;
  clinics: Clinic[] = [];
  selectedPatient!: Patient;
 
  patientId!: number;
 
  successMessage: string | null = null;
  errorMessage: string | null = null;
 
  constructor(
    private formBuilder: FormBuilder,
    private mediConnectService: MediConnectService
  ) {}
 
  ngOnInit(): void {
    if (!this.patientId) this.patientId = 1;
 
    this.appointmentForm = this.formBuilder.group({
      clinicId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      status: ['', Validators.required],
      purpose: ['', [Validators.required, Validators.minLength(5)]]
    });
 
    this.mediConnectService.getPatientById(this.patientId).subscribe({
      next: (p) => (this.selectedPatient = p)
    });
 
    this.mediConnectService.getAllClinics().subscribe({
      next: (c) => (this.clinics = c)
    });
  }
 
  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.errorMessage = 'Form is invalid.';
      this.successMessage = null;
      return;
    }
 
    const clinic = this.clinics.find(
      c => c.clinicId == this.appointmentForm.value.clinicId
    );
 
    const app: Appointment = {
      appointmentId: 0,
      patient: this.selectedPatient,
      clinic: clinic!,
      appointmentDate: this.appointmentForm.value.appointmentDate,
      status: this.appointmentForm.value.status,
      purpose: this.appointmentForm.value.purpose,
      logAttributes: undefined
    };
 
    this.mediConnectService.createAppointment(app).subscribe({
      next: () => {
        this.successMessage = 'Appointment created successfully!';
        this.errorMessage = null;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Failed to create appointment.';
        this.successMessage = null;
      }
    });
  }
}
 