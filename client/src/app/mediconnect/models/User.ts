import { Doctor } from './Doctor';
import { Clinic } from './Clinic';
export class User {
  userId: number;
  username: string;
  password: string;
  role: string;
  doctor?: Doctor;
  clinic?: Clinic;

  constructor(
    userId: number,
    username: string,
    password: string,
    role: string,
    doctor?: Doctor,
    clinic?: Clinic
  ) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.role = role;
    this.doctor = doctor;
    this.clinic = clinic;
  }

  logAttributes(): void {
    console.log(this);
  }
}
