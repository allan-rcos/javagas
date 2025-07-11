import { Routes } from '@angular/router';
import { HelloPage } from './pages/hello/hello-page.component';
import { LoginPage } from './pages/login/login-page.component';
import { RegisterCandidatePage } from './pages/register/candidate/register-candidate-page.component';
import { RegisterChoicePage } from './pages/register/register-choice-page.component';
import { RegisterCompanyPage } from './pages/register/company/register-company-page.component';

export const routes: Routes = [
  {
    path: 'hello',
    component: HelloPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    children: [
      { path: 'candidate', component: RegisterCandidatePage },
      { path: 'company', component: RegisterCompanyPage },
      { path: '', component: RegisterChoicePage },
    ],
  },
];
