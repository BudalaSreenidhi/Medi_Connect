package com.edutech.progressive.repository;

import com.edutech.progressive.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    // Derived query for looking up by PK, if your code/tests use it
    Optional<Doctor> findByDoctorId(int doctorId);

    // Day 9 & Day 13: used to enforce unique email for Doctor
    Optional<Doctor> findByEmail(String email);
}