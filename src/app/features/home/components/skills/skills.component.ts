import { Component, inject, signal } from '@angular/core';
import { SkillService } from '../../services/skills/skill.service';
import { SkillItem } from '../../models/skill';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
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

}
