import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Project } from '../../models/project';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project-service/project-service';
import { Router } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCardComponent, CommonModule, NgIcon, FormsModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  projectService = inject(ProjectService);
  projects = signal<Project[]>([])
  filter = signal<string>("")
  appliedFilter = signal<string>("")

  constructor(private router: Router) { }

  ngOnInit() {
    this.projectService.getAll().subscribe({
      next: (data) => {
        this.projects.set(data)
      },
      error: (err) => {
        console.log("ERROR: error en el servidor: " + err)
      }
    })
  }

  goToDetails(id: string) {
    this.router.navigate(["/projects/detail/", id])
  }

  resetSearch() {
    this.filter.set('');
    this.appliedFilter.set('');
  }

  search() {
    this.appliedFilter.set(this.filter())
  }

  filteredProject = computed(() => {
    const term = this.appliedFilter().toLowerCase().trim();

    if (!term) {
      return this.projects();
    }

    return this.projects().filter(project => {
      const matchName = project.name.toLowerCase().includes(term);

      return matchName;
    });
  });
}
