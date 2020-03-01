import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AddBlackListComponent} from './add-black-list/add-black-list.component';
import {AddUserListComponent} from './add-user-list/add-user-list.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlackListComponent} from "./black-list/black-list.component";
import {UserListComponent} from "./user-list/user-list.component";

@NgModule({
  declarations: [
    AdminComponent,
    AddBlackListComponent,
    AddUserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'admin', component: AdminComponent, children: [
          {path: 'add-black-list', component: AddBlackListComponent},
          {path: 'add-user-list', component: AddUserListComponent},
          {path: 'black-list', component: BlackListComponent},
          {path: 'user-list', component: UserListComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
