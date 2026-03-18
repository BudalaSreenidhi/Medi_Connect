import { Component, OnInit } from '@angular/core';
import { MediConnectService } from '../../services/mediconnect.service';
import { Clinic } from '../../models/Clinic';
import { Appointment } from '../../models/Appointment';
import { Doctor } from '../../models/Doctor';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  doctorId!: number;
  doctorDetails: Doctor | undefined;
  clinics: Clinic[] = [];
  selectClinicAppointments: Appointment[] = [];
 
  constructor(private mediConnectService: MediConnectService) {}
 
  ngOnInit(): void {
    if (!this.doctorId) this.doctorId = 1;
    this.loadDoctorData();
  }
 
  loadDoctorData(): void {
    this.mediConnectService.getDoctorById(this.doctorId).subscribe({
      next: (doctor) => {
        this.doctorDetails = doctor;
      },
      error: () => {
        this.doctorDetails = undefined;
      }
    });
 
    this.mediConnectService.getClinicsByDoctorId(this.doctorId).subscribe({
      next: (clinics) => {
        this.clinics = clinics;
      },
      error: () => {
        this.clinics = [];
      }
    });
  }
 
  loadAppointments(clinicId: number): void {
    this.mediConnectService.getAppointmentsByClinic(clinicId).subscribe({
      next: (appointments) => {
        this.selectClinicAppointments = appointments;
      },
      error: () => {
        this.selectClinicAppointments = [];
      }
    });
  }
}
 