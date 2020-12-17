import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ComicsComponent,
  LoginComponent,
  UserDetailsComponent,
  RegisterComponent
} from './components';
import { AuthGuardService } from 'src/app/core/services';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'comics',
    component: ComicsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'welcome'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
