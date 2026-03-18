export class Clinic {
  clinicId: number;
  clinicName: string;
  location: string;
  contactNumber: string;
  establishedYear: number;
  doctor: any;
 
  constructor(
    clinicId: number,
    clinicName: string,
    location: string,
    contactNumber: string,
    establishedYear: number,
    doctor: any
  ) {
    this.clinicId = clinicId;
    this.clinicName = clinicName;
    this.location = location;
    this.contactNumber = contactNumber;
    this.establishedYear = establishedYear;
    this.doctor = doctor;
  }
 
  logAttributes?(): void {}
}