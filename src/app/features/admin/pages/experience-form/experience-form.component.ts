import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TecnologyService } from '../../../projects/services/tecnology-service/tecnology-service';
import { Tecnology } from '../../../projects/models/tecnology';
import { Experience } from '../../../home/models/experience';
import { ExperienceService } from '../../../home/services/experience/experience.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-experience-from',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterLink,NgIcon ],
templateUrl: './experience-form.component.html',
  styleUrl: './experience-form.component.css'
})
export class ExperienceFormComponent implements OnInit {
  form: FormGroup;
  experience = signal<Experience | null>(null);
  idParam = signal<string | null>(null);

  tecnologies = signal<Tecnology[]>([]);
  selectedTecnologies = signal<Tecnology[]>([]);

  constructor(
    private fb: FormBuilder,
    private experienceService: ExperienceService,
    private tecnologyService: TecnologyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      role: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required]],
      period: ['', [Validators.required]],
      badge: [''],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.idParam.set(this.route.snapshot.paramMap.get('id'));

    if (this.idParam()) {
      this.experienceService.getById(this.idParam()!).subscribe({
        next: (data) => {
          this.experience.set(data);
          this.form.patchValue(data);
          if (data.tecnologies) {
            this.selectedTecnologies.set(data.tecnologies);
          }
        },
        error: (err) => {
          console.log("ERROR: error en el servidor: " + err);
        }
      });
    }

    this.tecnologyService.getAll().subscribe({
      next: (data) => {
        this.tecnologies.set(data);
      },
      error: (err) => {
        console.log("ERROR: error en el servidor: " + err);
      }
    });
  }

  selectTecnology(tec: Tecnology) {
    this.selectedTecnologies.update(list => {
      if (list.some(item => item.id === tec.id)) {
        return list.filter(item => item.id != tec.id);
      }
      return [...list, tec];
    });
  }

  isTechSelected(tecId: string): boolean {
    return this.selectedTecnologies().some(item => item.id === tecId);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;

    if (this.idParam()) {
      const updatedExperience: Experience = {
        ...this.experience()!,
        ...formValue,
        tecnologies: this.selectedTecnologies()
      };

      this.experienceService.update(this.idParam()!, updatedExperience).subscribe({
        next: () => {
          this.router.navigate(["/admin"]);
        },
        error: (err) => {
          console.log("ERROR: error en el servidor: " + err);
        }
      });
    } else {
      const newExperience: Experience = {
        role: formValue.role,
        company: formValue.company,
        period: formValue.period,
        badge: formValue.badge,
        description: formValue.description,
        tecnologies: this.selectedTecnologies()
      };

      this.experienceService.save(newExperience).subscribe({
        next: () => {
          this.router.navigate(["/admin"]);
        },
        error: (err) => {
          console.log("ERROR: error en el servidor: " + err);
        }
      });
    }
  }
}