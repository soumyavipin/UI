import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
  
    constructor(
        private readonly authService: BaseService,
        private router: Router,
        ) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      if (!this.authService.isLoggedIn) {
        this.router.navigate(['/login']);
        return false;
      }
  
      return true;
    }
  
  }