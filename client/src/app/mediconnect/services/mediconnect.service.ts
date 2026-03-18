import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
import { environment } from 'src/environments/environment';
 
import { Patient } from '../models/Patient';
import { PatientDTO } from '../models/PatientDTO';
import { Doctor } from '../models/Doctor';
import { DoctorDTO } from '../models/DoctorDTO';
import { Clinic } from '../models/Clinic';
import { Appointment } from '../models/Appointment';
import { User } from '../models/User';
 
@Injectable({
  providedIn: 'root'
})
export class MediConnectService {
 
  private baseUrl = environment.apiUrl;
 
  constructor(private http: HttpClient) {}
 
  addPatient(patient: Patient): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/patient`, patient);
  }
 
  updatePatient(patient: PatientDTO): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/patient/${patient.patientId}`, patient);
  }
 
  deletePatient(patientId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/patient/${patientId}`);
  }
 
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/patient`);
  }
 
  getPatientById(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/patient/${patientId}`);
  }
 
  // --- DOCTOR ---
 
  addDoctor(doctor: Doctor): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/doctor`, doctor);
  }
 
  getDoctorById(doctorId: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/doctor/${doctorId}`);
  }
 
  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctor`);
  }
 
  // --- CLINIC ---
 
  addClinic(clinic: Clinic): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/clinic`, clinic);
  }
 
  getClinicsByDoctorId(doctorId: number): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(`${this.baseUrl}/clinic/doctor/${doctorId}`);
  }
 
  updateClinic(clinic: Clinic): Observable<Clinic> {
    return this.http.put<Clinic>(`${this.baseUrl}/clinic/${clinic.clinicId}`, clinic);
  }
 
  deleteClinic(clinicId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/clinic/${clinicId}`);
  }
 
  // --- APPOINTMENTS ---
 
  getAppointmentsByClinic(clinicId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointment/clinic/${clinicId}`);
  }
 
  // --- USER ---
 
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${userId}`);
  }
}