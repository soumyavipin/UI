import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from 'src/app/services/base.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { FloorEditDialogComponent } from '../floor-edit-dialog/floor-edit-dialog.component';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TowerDetailsComponent } from '../../tower/tower-details/tower-details.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-floor-details',
  templateUrl: './floor-details.component.html',
  styleUrls: ['./floor-details.component.scss']
})


export class FloorDetailsComponent implements OnInit {
  userData: any;
  isLoading: boolean;
  towerData: any[] = [];
  selectedTowerId: number | undefined;
  selectedTowerName: string | undefined;
  dataSource: any;

  // displayedColumns: string[] = ['floor_id','floor_name', 'tower_id', 'tower_name', total floor_area', 'used_space','unused_space','common_space','entered_by','entered_user', 'entered_at', 'last_modified_at','verified_user','verified_at', 'Actions'];
  displayedColumns: string[] = ['floor_name', 'tower_name', 'total_floor_area', 'used_space', 'unused_space', 'common_space', 'entered_user', 'entered_at', 'verified_user', 'verified_at', 'Actions'];
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private httpBaseService: BaseService,
    private notifyService: NotificationService,
  ) {
    this.isLoading = false;
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    const userDataJSON = this.sessionService.getSessionData();
    if (userDataJSON) {
      this.userData = JSON.parse(userDataJSON);
    }
    console.log(this.userData);
    this.getFloorList();

    this.getTowerNames();


  }

  public getFloorList() {

    this.isLoading = true;

    const url = '/master/GetFloorList';
    const data = {
      Tower_id: 0,
      Company_Id: this.userData.Company_id,
      Bank_Date: this.userData.Bank_Date,
      User_Id: this.userData.User_Id,
      User_Branch_Id: this.userData.User_Branch_Id,
      Node_Id: this.userData.Node_Id,
      Bank_id: this.userData.Bank_id
    };
    const token = this.userData.Auth_Token;

    this.httpBaseService.postRequest(url, data, token).subscribe((dataRes: any) => {
      this.isLoading = false;
      //console.log(dataRes);

      if (dataRes) {
        //this.dataSource = dataRes;
        this.dataSource = new MatTableDataSource(dataRes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
    },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
        this.notifyService.showError(err, "Shoppers Market");
      }
    )

  }

  public getTowerNames() {
    this.isLoading = true;

    const url = '/master/GetFloorDetails';
    const data = {
      Table_name: "tower",
      Tower_Id: 0,
      Company_Id: this.userData.Company_id,
      Bank_Date: this.userData.Bank_Date,
      User_Id: this.userData.User_Id,
      User_Branch_Id: this.userData.User_Branch_Id,
      Node_Id: this.userData.Node_Id,
      Bank_id: this.userData.Bank_id
    };
    const token = this.userData.Auth_Token;
    //console.log(data,token);

    this.httpBaseService.postRequest(url, data, token).subscribe((dataRes: any) => {
      this.isLoading = false;
      //console.log(dataRes)
      if (dataRes) {
        this.towerData = dataRes.Tower_List;
      }
    },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
        this.notifyService.showError(err, "Shoppers Market");
      }
    )
  }

  onTowerSelectionChange() {
    console.log("selectedTowerId:", this.selectedTowerId);

    this.isLoading = true;

    const url = '/master/GetFloorList';
    const data = {
      Tower_id: this.selectedTowerId,
      Company_Id: this.userData.Company_id,
      Bank_Date: this.userData.Bank_Date,
      User_Id: this.userData.User_Id,
      User_Branch_Id: this.userData.User_Branch_Id,
      Node_Id: this.userData.Node_Id,
      Bank_id: this.userData.Bank_id
    };
    const token = this.userData.Auth_Token;

    this.httpBaseService.postRequest(url, data, token).subscribe((dataRes: any) => {
      this.isLoading = false;
      console.log(dataRes);

      if (dataRes) {
        this.dataSource = dataRes;
      }
    },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
        this.notifyService.showError(err, "Shoppers Market");
      }
    )

  }

  addRow() {
    const dialogRef = this.dialog.open(FloorEditDialogComponent, {
      width: '700px',
      data: {
        floor_id: '',
        floor_name: '',
        tower_id: '',
        total_floor_area: '',
        used_space: '',
        unused_space: '',
        common_space: '',
        towerList: this.towerData,

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.canceled) {
        this.getFloorList();
      }
    })
  }

  editRow(row: any) {
    const dialogRef = this.dialog.open(FloorEditDialogComponent, {
      width: '700px',
      data: {
        floor_id: row['Floor_Id'],
        floor_name: row['Floor_Name'],
        tower_id: row['Tower_Id'],
        total_floor_area: row['Total_Floor_Area'],
        used_space: row['Used_Space'],
        unused_space: row['Unused_Space'],
        common_space: row['Common_Space'],
        towerList: this.towerData,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.canceled) {
        this.getFloorList();
      }
    })

  }

  deleteRow(row: any) {
    this.confirmDialog("Are you sure you want to delete?").then((result) => {
      if (result === true) {

        this.isLoading = true;

        const dataStatus = 'DeleteData';
        const url = '/master/FloorCrud';

        const data = {
          Floor_Id: row['Floor_Id'],
          Floor_Name: row['Floor_Name'],
          Tower_Id: row['Tower_Id'],
          Total_Floor_area: row['Total_Floor_Area'],
          Used_Space: row['Used_Space'],
          Unused_Space: row['Unused_Space'],
          Common_space: row['Common_Space'],
          Data_Status: dataStatus,

          Company_Id: this.userData.Company_id,
          Bank_Date: this.userData.Bank_Date,
          User_Id: this.userData.User_Id,
          User_Branch_Id: this.userData.User_Branch_Id,
          Node_Id: this.userData.Node_Id,
          Bank_id: this.userData.Bank_id
        };
        const token = this.userData.Auth_Token;

        console.log(data);

        this.httpBaseService.postRequest(url, data, token).subscribe((dataRes: any) => {
          this.isLoading = false;

          this.getFloorList();

        },
          (err: any) => {
            this.isLoading = false;
            console.log(err);
            this.notifyService.showError(err, 'Shoppers Market');
          }
        );
      }
    })
  }

  confirmDialog(message: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {

      const dialogData = new ConfirmDialogModel("", message);

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        maxWidth: "400px",
        data: dialogData
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    })
  }
}
