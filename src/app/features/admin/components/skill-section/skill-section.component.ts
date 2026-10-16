import { Component, inject, signal } from '@angular/core';
import { SkillService } from '../../../home/services/skills/skill.service';
import { SkillItem } from '../../../home/models/skill';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'skill-section',
  imports: [NgIcon],
  templateUrl: './skill-section.component.html',
  styleUrl: './skill-section.component.css'
})
export class SkillSectionComponent {
  skillService = inject(SkillService);
  skills = signal<SkillItem[]>([])

  constructor(private router: Router) { }

  ngOnInit() {
    this.skillService.getAll().subscribe({
      next: (data) => {
        this.skills.set(data)
      },
      error: (err) => {
        console.log("ERROR: error en el servidor: " + err)
      }
    })
  }

  goToUpdate(id: string) {
    this.router.navigate(["form", id])
  }

  deleteSkill(id: string) {
    this.skillService.delete(id).subscribe({
      next: () => {
        this.skills.update(skillList => skillList.filter(s => s.id != id));
      },
      error: (err) => {
        console.log("ERROR: error en el servidor: " + err)
      }
    })
  }
}
