import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BaseService } from 'src/app/services/base.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-floor-edit-dialog',
  templateUrl: './floor-edit-dialog.component.html',
  styleUrls: ['./floor-edit-dialog.component.scss']
})
export class FloorEditDialogComponent implements OnInit {
  editForm: FormGroup;
  userData: any;
  isLoading: boolean;
  towerData: any[] = [];
  updatedFloorName: any;
  updatedTotalFloorArea: any;
  updatedUsedSpace: any;
  updatedUnusedSpace: any;
  updatedCommonSpace: any;
  updatedTowerId: any;
  selectedTowerId: number | undefined;
  message: string | undefined;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<FloorEditDialogComponent>,
    private sessionService: SessionService,
    private httpBaseService: BaseService,
    private notifyService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({
      floor_name: [data.floor_name, Validators.required],
      tower_id: [data.tower_id, Validators.required],
      total_floor_area: [data.total_floor_area, Validators.required],
      used_space: [data.used_space, Validators.required],
      unused_space: [data.unused_space, Validators.required],
      common_space: [data.common_space, Validators.required],

    });

    this.editForm.valueChanges.subscribe((formValues) => {
      this.updatedFloorName = formValues.floor_name;
      this.updatedTotalFloorArea = formValues.total_floor_area;
      this.updatedUsedSpace = formValues.used_space;
      this.updatedUnusedSpace = formValues.unused_space;
      this.updatedCommonSpace = formValues.common_space;
      this.updatedTowerId = formValues.tower_id;
    });

    this.isLoading = false;
  }

  ngOnInit() {
    const userDataJSON = this.sessionService.getSessionData();
    if (userDataJSON) {
      this.userData = JSON.parse(userDataJSON);
    }

    this.selectedTowerId = this.data.tower_id;
    //console.log(this.selectedTowerId);
    this.towerData = this.data.towerList;

    console.log(this.data);
  }

  onCancel() {
    this.dialogRef.close({ canceled: false });
  }

  onSave() {
    if (this.editForm.valid) {

      if (this.data.floor_id == '') {

        this.message = "Are you sure you want to add the floor?";
      }
      else {
        this.message = "Are you sure you want to edit the floor? ";
      }

      this.confirmDialog(this.message).then((result) => {
        if (result === true) {

          if (this.data.floor_id == '') {
            this.isLoading = true;

            const url = '/master/FloorCrud';
            const data = {
              Floor_Id: -1,
              Floor_Name: this.updatedFloorName,
              Tower_Id: this.updatedTowerId,
              Total_Floor_Area: this.updatedTotalFloorArea,
              Used_Space: this.updatedUsedSpace,
              Unused_Space: this.updatedUnusedSpace,
              Common_Space: this.updatedCommonSpace,
              Data_Status: 'InsertData',

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

            },
              (err: any) => {
                this.isLoading = false;
                console.log(err);
                this.notifyService.showError(err, 'Shoppers Market');
              }
            );
            this.dialogRef.close({ canceled: true });

          }
          else {
            this.isLoading = true;

            const url = '/master/FloorCrud';
            const data = {
              Floor_Id: this.data.floor_id,
              Floor_Name: this.updatedFloorName,
              Tower_Id: this.data.tower_id,
              Total_Floor_Area: this.updatedTotalFloorArea,
              Used_Space: this.updatedUsedSpace,
              Unused_Space: this.updatedUnusedSpace,
              Common_Space: this.updatedCommonSpace,
              Data_Status: 'UpdateData',

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

            },
              (err: any) => {
                this.isLoading = false;
                console.log(err);
                this.notifyService.showError(err, 'Shoppers Market');
              }
            )
          };

          this.dialogRef.close({ canceled: true });
        }

      });
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

