import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './project/auth/error-404/error-404.component';

const routes: Routes = [
  { path:'auth', loadChildren: () => import('./project/auth/auth.module').then(m => m.AuthModule) },
  { path:'admin',loadChildren:()=>import('./project/admin/admin.module').then(m=>m.AdminModule)},
  { path:'user',loadChildren:()=>import('./project/user/user.module').then(m=>m.UserModule)},
  { path: '', redirectTo: 'user/flight-ticket/book', pathMatch: 'full' },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

