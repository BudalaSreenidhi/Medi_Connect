package com.edutech.progressive.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.edutech.progressive.entity.Patient;
import com.edutech.progressive.exception.PatientAlreadyExistsException;
import com.edutech.progressive.service.PatientService;
import com.edutech.progressive.service.impl.PatientServiceImplJpa;

@RestController
@RequestMapping("/patient")
public class PatientController {

    private final PatientServiceImplJpa service; // keeping your existing wiring

    public PatientController(com.edutech.progressive.repository.PatientRepository repository) {
        this.service = new PatientServiceImplJpa(repository);
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return service.getAllPatients();
    }

    @GetMapping("/sorted")
    public ResponseEntity<List<Patient>> getAllSorted() {
        List<Patient> list = service.getAllPatientSortedByName(); // <-- add ()
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Patient patient) {
        try {
            Optional<Patient> updated = service.updatePatient(id, patient);
            if (updated.isPresent()) {
                return ResponseEntity.ok(updated.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Patient not found with id: " + id);
            }
        } catch (PatientAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            service.deletePatient(id.intValue());
        } catch (Exception ignored) { }
        return ResponseEntity.noContent().build(); // 204 with no body
    }
}