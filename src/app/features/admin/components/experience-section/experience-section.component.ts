import { Component, inject, OnInit, signal } from '@angular/core';
import { ExperienceService } from '../../../home/services/experience/experience.service';
import { Experience } from '../../../home/models/experience';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'experience-section',
  imports: [NgIconComponent,RouterLink],
  templateUrl: './experience-section.component.html',
  styleUrl: './experience-section.component.css'
})
export class ExperienceSectionComponent implements OnInit{
experienceService = inject(ExperienceService);
  experiences = signal<Experience[]>([]);

  constructor(private router: Router) {}

  ngOnInit() {
    this.experienceService.getAll().subscribe({
      next: (data) => {
        this.experiences.set(data);
      },
      error: (err) => {
        console.log("ERROR: error en el servidor: " + err);
      }
    });
  }

  goToUpdate(id: string) {
    this.router.navigate(["/form/experience", id]); 
  }

  deleteExperience(id: string) {
    this.experienceService.delete(id).subscribe({
      next: () => {
        this.experiences.update(expList => expList.filter(e => e.id != id));
      },
      error: (err) => {
        console.log("ERROR: error en el servidor: " + err);
      }
    });
  }
}
