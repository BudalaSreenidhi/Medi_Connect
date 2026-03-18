import { Component, OnInit } from '@angular/core';
import { MediConnectService } from '../../services/mediconnect.service';
import { Patient } from '../../models/Patient';
import { Appointment } from '../../models/Appointment';
import { Clinic } from '../../models/Clinic';
import { Doctor } from '../../models/Doctor';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  patientId!: number;
  patientDetails: Patient | undefined;
 
  appointments: Appointment[] = [];
  clinics: Clinic[] = [];
  doctors: Doctor[] = [];
 
  constructor(
    private mediConnectService: MediConnectService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    if (!this.patientId) this.patientId = 1;   // test overrides this
    this.loadPatientData();
  }
 
  loadPatientData(): void {
    this.mediConnectService.getPatientById(this.patientId).subscribe({
      next: (patient) => {
        this.patientDetails = patient;
      },
      error: () => {
        this.patientDetails = undefined;
      }
    });
 
    this.mediConnectService.getAppointmentsByPatient(this.patientId).subscribe({
      next: (apps) => (this.appointments = apps),
      error: () => (this.appointments = [])
    });
 
    this.mediConnectService.getAllClinics().subscribe({
      next: (clinics) => (this.clinics = clinics),
      error: () => (this.clinics = [])
    });
 
    this.mediConnectService.getAllDoctors().subscribe({
      next: (doctors) => (this.doctors = doctors),
      error: () => (this.doctors = [])
    });
  }
 
  navigateToEditPatient(): void {
    this.router.navigate([`/mediconnect/patient/edit/${this.patientId}`]);
  }
 
  deletePatient(): void {
    this.mediConnectService.deletePatient(this.patientId).subscribe({
      next: () => {
        alert('Patient deleted successfully!');
        this.router.navigate(['/auth']);
      },
      error: () => {
        alert('Error deleting patient.');
      }
    });
  }
}