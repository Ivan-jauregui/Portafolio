import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request/request.service';
import { ProjectRequest } from '../../models/projectRequest';
import { from } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent  {
  form: FormGroup;
  private requestService = inject(RequestService);

  private request = signal<ProjectRequest | null>(null);
  private idParam = signal<string | null>(null);

  isSubmitting = signal<boolean>(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      applicantName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      projectType: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(15)]],
      budget: ['', [Validators.required, Validators.min(100)]],
      estimatedDate: ['', [Validators.required]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      this.isSubmitting.set(true);
      this.successMessage.set(null);
      this.errorMessage.set(null);

      const formValue = this.form.value;

      const newRequest: ProjectRequest = {
        ...formValue,
        createdAt: new Date().toISOString()
      };

      this.requestService.save(newRequest).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.successMessage.set('¡Solicitud enviada con éxito! Me pondré en contacto pronto.');
          this.form.reset();
        },
        error: (err) => {
          console.error("ERROR: error en el servidor: ", err);
          this.isSubmitting.set(false);
          this.errorMessage.set("Hubo un error al enviar la solicitud.");
        }
      });

    } else {
    
      this.form.markAllAsTouched();
      this.errorMessage.set("Por favor, completa correctamente todos los campos obligatorios.");
    }

  }
}