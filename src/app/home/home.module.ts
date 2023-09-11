import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';


const routes: Routes = [
  {
    path: '',
    component: MenuBarComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'masterdefn',
        loadChildren: () => import('./masterdefn/masterdefn.module').then(m => m.MasterdefnModule)
      },
    ]
  }
];


@NgModule({
  declarations: [
    MenuBarComponent
  ],
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatMenuModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
