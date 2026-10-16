import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project-service/project-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-project-details',
  imports: [NgIcon,RouterLink],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit{
  idParam = signal<string | null>(null);
  project = signal<Project | null>(null);
  
  private projectService = inject(ProjectService);
  private router = inject(Router); 
  private route = inject(ActivatedRoute);

    ngOnInit() {
    this.idParam.set(this.route.snapshot.paramMap.get('id'));

    if (this.idParam()) {
      this.projectService.getById(this.idParam()!).subscribe({
        next: (data) => {
          this.project.set(data);
        },
        error: (err) => {
          console.error("ERROR: error en el servidor: " + err);
        }
      });
    }
  }
}
