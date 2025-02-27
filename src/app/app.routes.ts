import { Routes } from '@angular/router';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { TemplateFromComponent } from './pages/template-from/template-from.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'user-form', component: UserDetailsComponent },
  { path: 'template-form', component: TemplateFromComponent },
];
