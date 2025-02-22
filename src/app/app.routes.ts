import { Routes } from '@angular/router';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

export const routes: Routes = [ { path: '', redirectTo: '', pathMatch: 'full' }, // Redirect to home
    { path: 'user-form', component: UserDetailsComponent },
];
