import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    LoadingComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule, 
    MatDialogModule
  ],
  exports: [
    LoadingComponent
  ],
})
export class SharedModule { }
