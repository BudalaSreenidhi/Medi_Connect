package com.edutech.progressive.repository;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edutech.progressive.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Optional<Patient> findByEmail(String email);   // <-- used above
    Patient findByPatientId(int patientId);        // if you already had this
}