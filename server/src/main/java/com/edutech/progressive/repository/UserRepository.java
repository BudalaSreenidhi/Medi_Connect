package com.edutech.progressive.repository;

import com.edutech.progressive.entity.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

@Modifying @Transactional
@Query("DELETE FROM User u WHERE u.patient.patientId = :pid")
void deleteByPatientId(@Param("pid") int pid);

@Modifying @Transactional
@Query("DELETE FROM User u WHERE u.doctor.doctorId = :did")
void deleteByDoctorId(@Param("did") int did);
}