import { Component, inject, signal } from '@angular/core';
import { ProjectListComponent } from '../../../projects/pages/project-list/project-list.component';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../projects/services/project-service/project-service';
import { Project } from '../../../projects/models/project';
import { ProjectSectionComponent } from '../../components/project-section/project-section.component';
import { SkillSectionComponent } from '../../components/skill-section/skill-section.component';
import { ExperienceSectionComponent } from '../../components/experience-section/experience-section.component';
import { NgIcon } from '@ng-icons/core';
@Component({
  selector: 'app-admin',
  imports: [ProjectSectionComponent,SkillSectionComponent,ExperienceSectionComponent, RouterLink, NgIcon],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
 projectService = inject(ProjectService);
  projects = signal<Project[]>([])

  constructor(private router:Router){}

  ngOnInit(){
    this.projectService.getAll().subscribe({
      next:(data)=>{
        this.projects.set(data)
      },
      error:(err)=>{
        console.log("ERROR: error en el servidor: "+ err)
      }
    })
  }

  goToUpdate(id:string){
    this.router.navigate(["form",id])
  }

  deleteProject(id:string){
    this.projectService.delete(id).subscribe({
      next:()=>{
        this.projects.update(projectList => projectList.filter(p=>p.id!=id));
      },
      error:(err)=>{
         console.log("ERROR: error en el servidor: "+ err)
      }
    })
  }
}
