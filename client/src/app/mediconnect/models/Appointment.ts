export class Appointment {
  appointmentId: number;
  patient: any;
  clinic: any;
  appointmentDate: Date;
  status: string;
  purpose: string;
 
  constructor(
    appointmentId: number,
    patient: any,
    clinic: any,
    appointmentDate: Date,
    status: string,
    purpose: string
  ) {
    this.appointmentId = appointmentId;
    this.patient = patient;
    this.clinic = clinic;
    this.appointmentDate = appointmentDate;
    this.status = status;
    this.purpose = purpose;
  }
 
  logAttributes?(): void {}
}