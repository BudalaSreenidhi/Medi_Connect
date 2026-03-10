package com.edutech.progressive.repository;

import com.edutech.progressive.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {

    // Day 9 & Day 13: used to enforce unique email for Patient
    Optional<Patient> findByEmail(String email);

    // If you already reference this elsewhere, keep it; otherwise Optional<> is a safer return
    Patient findByPatientId(int patientId);
}