package com.edutech.progressive.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.edutech.progressive.entity.Patient;
import com.edutech.progressive.exception.PatientAlreadyExistsException;
import com.edutech.progressive.exception.PatientNotFoundException;
import com.edutech.progressive.repository.PatientRepository;
import com.edutech.progressive.service.PatientService;

@Service
public class PatientServiceImplJpa implements PatientService {

    private PatientRepository repository;

    public PatientServiceImplJpa() { }

    @Autowired
    public PatientServiceImplJpa(PatientRepository repository) {
        this.repository = repository;
    }

    public void setRepository(PatientRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Patient> getAllPatients() {
        if (repository == null) return new ArrayList<>();
        return repository.findAll();
    }

    @Override
    public Integer addPatient(Patient patient) throws Exception {
        if (repository == null) throw new IllegalStateException("PatientRepository is not initialized");

        if (patient != null && patient.getEmail() != null) {
            repository.findByEmail(patient.getEmail()).ifPresent(existing -> {
                throw new PatientAlreadyExistsException(
                    "Patient already exists with email: " + patient.getEmail()
                );
            });
        }

        Patient saved = repository.save(patient);
        return saved.getPatientId();
    }

    @Override
    public List<Patient> getAllPatientSortedByName() {
        if (repository == null) return new ArrayList<>();
        return repository.findAll(Sort.by(Sort.Direction.ASC, "fullName"));
    }

    public List<Patient> getAllPatientsSortedByName() {
        return getAllPatientSortedByName();
    }

    @Override
    public void updatePatient(Patient patient) {
        if (repository == null || patient == null) return;

        int id = patient.getPatientId();
        Patient existing = repository.findById(id)
            .orElseThrow(() -> new PatientNotFoundException("Patient not found with id: " + id));

        if (patient.getEmail() != null && !patient.getEmail().equals(existing.getEmail())) {
            repository.findByEmail(patient.getEmail()).ifPresent(conflict -> {
                if (!Objects.equals(conflict.getPatientId(), existing.getPatientId())) {
                    throw new PatientAlreadyExistsException(
                        "Another patient already exists with email: " + patient.getEmail()
                    );
                }
            });
            existing.setEmail(patient.getEmail());
        }

        existing.setFullName(patient.getFullName());
        existing.setDateOfBirth(patient.getDateOfBirth());
        existing.setContactNumber(patient.getContactNumber());
        existing.setAddress(patient.getAddress());

        repository.save(existing);
    }

    public Optional<Patient> updatePatient(Long id, Patient patient) {
        if (repository == null || id == null || patient == null) return Optional.empty();

        int pid = id.intValue();
        Patient existing = repository.findById(pid).orElse(null);
        if (existing == null) return Optional.empty();

        if (patient.getEmail() != null && !patient.getEmail().equals(existing.getEmail())) {
            repository.findByEmail(patient.getEmail()).ifPresent(conflict -> {
                if (!Objects.equals(conflict.getPatientId(), existing.getPatientId())) {
                    throw new PatientAlreadyExistsException(
                        "Another patient already exists with email: " + patient.getEmail()
                    );
                }
            });
            existing.setEmail(patient.getEmail());
        }

        existing.setFullName(patient.getFullName());
        existing.setDateOfBirth(patient.getDateOfBirth());
        existing.setContactNumber(patient.getContactNumber());
        existing.setAddress(patient.getAddress());

        Patient saved = repository.save(existing);
        return Optional.ofNullable(saved);
    }

    @Override
    public void deletePatient(int patientId) {
        if (repository == null) return;
        if (repository.existsById(patientId)) {
            repository.deleteById(patientId);
        }
    }

    @Override
    public Patient getPatientById(int patientId) {
        if (repository == null) return null;

        try {
            Patient byDerived = repository.findByPatientId(patientId);
            if (byDerived != null) return byDerived;
        } catch (Exception ignored) { }

        return repository.findById(patientId)
            .orElseThrow(() -> new PatientNotFoundException("Patient not found with id: " + patientId));
    }
}