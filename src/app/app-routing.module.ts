import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';

const routes: Routes = [
  { path: 'users', component: ViewUsersComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: 'users/create', component: CreateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ViewUsersComponent, EditUserComponent, CreateUserComponent]

