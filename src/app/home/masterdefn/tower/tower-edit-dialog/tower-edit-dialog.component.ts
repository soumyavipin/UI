import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseService } from 'src/app/services/base.service';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tower-edit-dialog',
  templateUrl: './tower-edit-dialog.component.html',
  styleUrls: ['./tower-edit-dialog.component.scss']
})
export class TowerEditDialogComponent implements OnInit{
  editForm: FormGroup;
  userData: any;
  notifyService: any;
  updatedTowerName!: string;
  message:string | undefined;
  updatedNumberOfFloors!: number;
  isLoading: boolean;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TowerEditDialogComponent>,
    private httpBaseService: BaseService,
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    // Initialize the form and set initial values from the data
    this.editForm = this.formBuilder.group({
      tower_name: [data.tower_name, Validators.required],
      no_of_floors: [data.no_of_floors, Validators.required]
    });

    this.editForm.valueChanges.subscribe((formValues) => {
      this.updatedTowerName = formValues.tower_name;
      this.updatedNumberOfFloors = formValues.no_of_floors;
    });

    this.updatedTowerName = this.editForm.get('tower_name')?.value;
    this.updatedNumberOfFloors = this.editForm.get('no_of_floors')?.value;
    
    this.isLoading = false;
  }

  ngOnInit() {

    const userDataJSON = this.sessionService.getSessionData();
    if (userDataJSON) {
      this.userData = JSON.parse(userDataJSON);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    // Allow only numeric keys (0-9) and specific control keys (e.g., Backspace, Delete)
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  onCancel() {
    this.dialogRef.close({canceled: false} );
  }

  onSave() {
    if (this.editForm.valid) {

      if (this.data.tower_id == '') {

        this.message="Are you sure you want to add the tower?";
      }
      else {
        this.message="Are you sure you want to edit the tower? ";
        }
      
      this.confirmDialog(this.message).then((result) => {
        if (result === true) {

          if (this.data.tower_id == '') {

            this.isLoading = true;
            const towerId = -1;
            const towerName = this.updatedTowerName;
            const noFloors = this.updatedNumberOfFloors;
            const dataStatus = 'InsertData';

            const url = '/master/TowerCrud';
            const data = {
              Tower_Id: towerId,
              Tower_Name: towerName,
              No_Of_Floors: noFloors,
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
              console.log(dataRes);

              //window.location.reload();
            },
              (err: any) => {
                this.isLoading = false;
                console.log(err);
                this.notifyService.showError(err, 'Shoppers Market');
              }
            );
            this.dialogRef.close({canceled: true} );

          }

          else {
            this.isLoading = true;
            const towerId = this.data.tower_id;
            const towerName = this.updatedTowerName;
            const noFloors = this.updatedNumberOfFloors;
            const dataStatus = 'UpdateData';

            const url = '/master/TowerCrud';

            const data = {
              Tower_Id: towerId,
              Tower_Name: towerName,
              No_Of_Floors: noFloors,
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
              console.log(dataRes);

              //window.location.reload();
            },
              (err: any) => {
                this.isLoading = false;
                console.log(err);
                this.notifyService.showError(err, 'Shoppers Market');
              }
            );

            this.dialogRef.close({canceled: true});
          }
        }
      })
    }
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
