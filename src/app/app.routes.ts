import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { ProjectListComponent } from './features/projects/pages/project-list/project-list.component';
import { AdminComponent } from './features/admin/pages/admin/admin.component';
import { ProjectFromComponent } from './features/admin/pages/project-from/project-from.component';
import { ExperienceFormComponent } from './features/admin/pages/experience-form/experience-form.component';
import { RequestListComponent } from './features/admin/pages/request-list/request-list.component';
import { RequestDetailsComponent } from './features/admin/pages/request-details/request-details.component';
import { ProjectDetailsComponent } from './features/projects/pages/project-details/project-details.component';

export const routes: Routes = [
    {path:"" , component:HomeComponent},
    {path:"projects" , component:ProjectListComponent},
    {path:"projects/detail/:id" , component:ProjectDetailsComponent},
    {path:"admin" , component:AdminComponent},
    {path:"form/project" , component:ProjectFromComponent},
    {path:"form/project/:id" , component:ProjectFromComponent},
    {path:"form/experience" , component:ExperienceFormComponent},
    {path:"form/experience/:id" , component:ExperienceFormComponent},
    {path:"projects/request" , component:RequestListComponent},
    {path:"projects/request/detail/:id" , component:RequestDetailsComponent},
    {path:"**" , redirectTo:''},
];
