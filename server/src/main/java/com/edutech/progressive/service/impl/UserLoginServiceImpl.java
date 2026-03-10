package com.edutech.progressive.service.impl;

import com.edutech.progressive.dto.UserRegistrationDTO;
import com.edutech.progressive.entity.Doctor;
import com.edutech.progressive.entity.Patient;
import com.edutech.progressive.entity.User;
import com.edutech.progressive.repository.DoctorRepository;
import com.edutech.progressive.repository.PatientRepository;
import com.edutech.progressive.repository.UserRepository;
import com.edutech.progressive.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserLoginServiceImpl implements UserLoginService, UserDetailsService {

    @Autowired private UserRepository userRepository;
    @Autowired private PatientRepository patientRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    /**
     * Day-13: Register a PATIENT or DOCTOR.
     * - Username must be unique
     * - Email must be unique within the selected role
     * - Creates corresponding Patient/Doctor entity and binds to User with proper role
     */
    @Override
    public void registerUser(UserRegistrationDTO dto) throws Exception {
        // Unique username
        if (userRepository.findByUsername(dto.getUsername()) != null) {
            throw new Exception("User already exists");
        }

        // PATIENT registration
        if ("PATIENT".equalsIgnoreCase(dto.getRole())) {
            if (patientRepository.findByEmail(dto.getEmail()).isPresent()) {
                throw new Exception("Patient with this email already exists");
            }

            Patient patient = new Patient();
            patient.setFullName(dto.getFullName());
            patient.setDateOfBirth(dto.getDateOfBirth());
            patient.setContactNumber(dto.getContactNumber());
            patient.setEmail(dto.getEmail());
            patient.setAddress(dto.getAddress());
            patient = patientRepository.save(patient);

            User u = new User();
            u.setUsername(dto.getUsername());
            u.setPassword(passwordEncoder.encode(dto.getPassword()));
            u.setRole("PATIENT");
            u.setPatient(patient);
            userRepository.save(u);
            return;
        }

        // DOCTOR registration
        if ("DOCTOR".equalsIgnoreCase(dto.getRole())) {
            if (doctorRepository.findByEmail(dto.getEmail()).isPresent()) {
                throw new Exception("Doctor with this email already exists");
            }

            Doctor doctor = new Doctor();
            doctor.setFullName(dto.getFullName());
            doctor.setSpecialty(dto.getSpecialty());
            doctor.setContactNumber(dto.getContactNumber());
            doctor.setEmail(dto.getEmail());
            doctor.setYearsOfExperience(dto.getYearsOfExperience());
            doctor = doctorRepository.save(doctor);

            User u = new User();
            u.setUsername(dto.getUsername());
            u.setPassword(passwordEncoder.encode(dto.getPassword()));
            u.setRole("DOCTOR");
            u.setDoctor(doctor);
            userRepository.save(u);
            return;
        }

        // Invalid role
        throw new Exception("Invalid role");
    }

    /**
     * Helper for login: find user by username. Returns null if not found.
     */
    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Day-13: The test expects a RuntimeException when the user is not found.
     * Do NOT return null — throw with the exact message format:
     * "User not found with ID: {userId}"
     */
    @Override
    public User getUserDetails(int userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    /**
     * Spring Security’s UserDetailsService for JWT validation.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByUsername(username);
        if (u == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return new org.springframework.security.core.userdetails.User(
                u.getUsername(),
                u.getPassword(),
                Collections.singleton(() -> u.getRole())
        );
    }
}
