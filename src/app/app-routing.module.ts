import { ErrorPageComponent } from './error-page/error-page.component';
import { OAuthVerificationComponent } from './auth/oauth-verification/oauth-verification.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from 'src/auth.guard';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
    
  },
  {
    path : 'OAuthVerification',
    component : OAuthVerificationComponent
    
  },
  {
    path: 'layout',
    loadChildren: () =>
      import('./DASHBOARD/layout.module').then((m) => m.LayoutModule),
  },{
    path : '**',
    component : ErrorPageComponent
    
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
