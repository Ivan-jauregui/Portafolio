import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../../projects/services/project-service/project-service';
import { Project } from '../../../projects/models/project';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'project-section',
  imports: [CommonModule, RouterLink],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css'
})
export class ProjectSectionComponent {
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
    this.router.navigate(["/form/project",id])
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
