import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { ProjectListComponent } from './features/projects/pages/project-list/project-list.component';
import { AdminComponent } from './features/admin/pages/admin/admin.component';
import { ProjectFromComponent } from './features/admin/pages/project-from/project-from.component';

export const routes: Routes = [
    {path:"" , component:HomeComponent},
    {path:"projects" , component:ProjectListComponent},
    {path:"admin" , component:AdminComponent},
    {path:"form" , component:ProjectFromComponent},
    {path:"form/:id" , component:ProjectFromComponent},
    {path:"**" , redirectTo:''},
];
