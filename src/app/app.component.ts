import { Component } from '@angular/core';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sampleapp';
  isOpen:boolean = false;

  constructor(
    private baseService:BaseService
  ){
    this.isOpen = this.baseService.isLoggedIn;
  }
}
