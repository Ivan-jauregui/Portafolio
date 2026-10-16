import { Component, inject, OnInit, signal } from '@angular/core';

import { ExperienceService } from '../../services/experience.service';
import { Experience } from '../../models/experience';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experienceService = inject(ExperienceService);
  experiences = signal<Experience[]>([]);

  ngOnInit(){
    this.experienceService.getAll().subscribe({
      next: (data) => {
        this.experiences.set(data)
      },
      error: (err) => {
        console.log("ERROR: error en el servidor: " + err);
      }
    });
  }
}
