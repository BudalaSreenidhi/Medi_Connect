export class Doctor {
  doctorId: number;
  fullName: string;
  email: string;
  specialty: string;
  yearsOfExperience: number;
  contactNumber: string;
 
  constructor(
    doctorId: number,
    fullName: string,
    email: string,
    specialty: string,
    yearsOfExperience: number,
    contactNumber: string
  ) {
    this.doctorId = doctorId;
    this.fullName = fullName;
    this.email = email;
    this.specialty = specialty;
    this.yearsOfExperience = yearsOfExperience;
    this.contactNumber = contactNumber;
  }
 
  logAttributes?(): void {}
}