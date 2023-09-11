import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FloorEditDialogComponent } from './floor/floor-edit-dialog/floor-edit-dialog.component';
import { TowerDetailsComponent } from './tower/tower-details/tower-details.component';
import { FloorDetailsComponent } from './floor/floor-details/floor-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TowerEditDialogComponent } from './tower/tower-edit-dialog/tower-edit-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TestComponent } from './test/test.component';
import { FloorPartitionComponent } from './floor-partition/floor-partition/floor-partition.component';
import { FloorPartitionEditDialogComponent } from './floor-partition/floor-partition-edit-dialog/floor-partition-edit-dialog.component';
import { MatSelectModule } from '@angular/material/select';


const routes: Routes = [
  { path: 'tower', component: TowerDetailsComponent },
  { path: 'floor', component: FloorDetailsComponent },
  { path: 'floor-partition', component: FloorPartitionComponent},
  { path: 'test', component: TestComponent },
 ];

@NgModule({
  declarations: [
    TowerDetailsComponent,
    FloorDetailsComponent,
    FloorEditDialogComponent,
    TowerEditDialogComponent,
    TestComponent,
    FloorPartitionComponent,
    FloorPartitionEditDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    ReactiveFormsModule, 
    MatCardModule,
    MatSelectModule,
    
    
    MatPaginatorModule,
  ]
})
export class MasterdefnModule { }
