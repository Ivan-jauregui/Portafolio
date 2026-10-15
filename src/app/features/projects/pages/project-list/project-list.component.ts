import { Component, inject, OnInit, signal } from '@angular/core';

import { Project } from '../../models/project';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project-service/project-service';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCardComponent,CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
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
