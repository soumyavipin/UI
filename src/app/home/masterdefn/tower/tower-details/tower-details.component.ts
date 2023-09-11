import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from 'src/app/services/base.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { TowerEditDialogComponent } from '../tower-edit-dialog/tower-edit-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../../test/test.component';

@Component({
  selector: 'app-tower-details',
  templateUrl: './tower-details.component.html',
  styleUrls: ['./tower-details.component.scss', '../../../../../styles.scss']
})
export class TowerDetailsComponent implements OnInit {

  userData: any;
  isLoading: boolean;
  displayedColumns: string[] = ['tower_name', 'no_of_floors', 'entered_user', 'entered_at', 'Actions'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private httpBaseService: BaseService,
    private notifyService: NotificationService,
  ) {

    this.dataSource = new MatTableDataSource([]);
    this.isLoading = false;
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

  ngOnInit() {

    const userDataJSON = this.sessionService.getSessionData();
    if (userDataJSON) {
      this.userData = JSON.parse(userDataJSON);
    }

    this.getTowerList();
  }

  public getTowerList() {
    this.isLoading = true;

    const url = '/master/GetTowerList';
    const data = {
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
      if (dataRes) {
        //console.log(dataRes);
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

  editRow(row: any) {

    const dialogRef = this.dialog.open(TowerEditDialogComponent, {
      width: '700px',
      data: {
        tower_name: row['Tower_Name'],
        tower_id: row['Tower_Id'],
        no_of_floors: row['No_Of_Floors'],
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.canceled) {
        this.getTowerList();
      }
    })
  }

  deleteRow(row: any) {
    this.confirmDialog("Are you sure you want to delete?").then((result) => {
      if (result === true) {

        this.isLoading = true;
        const towerId = row['Tower_Id'];
        const towerName = row['Tower_Name'];
        const noFloors = row['No_Of_Floors'];
        const dataStatus = 'DeleteData';
        const url = '/master/TowerCrud';

        const data = {
          Tower_Id: towerId,
          Tower_Name: towerName,
          Number_Of_Floors: noFloors,
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
          this.getTowerList();
          // window.location.reload();
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

  addRow() {
    const dialogRef = this.dialog.open(TowerEditDialogComponent, {
      width: '700px',
      data: {
        tower_id: '',
        tower_name: '',
        no_of_floors: '',
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.canceled) {
        this.getTowerList();
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
