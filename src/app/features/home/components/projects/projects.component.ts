import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../../projects/services/project-service/project-service';
import { Project } from '../../../projects/models/project';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
projectService = inject(ProjectService);
  projects = signal<Project[]>([])

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
}
