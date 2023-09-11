import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetails } from './UserDetails';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BaseService } from './services/base.service';
import { NotificationService } from './services/notification.service';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './services/auth-guard';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', component: LoginComponent }, 
 
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
      canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,

    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule, 
    MatProgressSpinnerModule,
    MatInputModule,

    SharedModule,

  ],
  exports:[ 
   ],
  providers: [
    UserDetails,
    BaseService,
    NotificationService
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
