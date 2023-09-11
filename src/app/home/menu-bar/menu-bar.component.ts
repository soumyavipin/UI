import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseService } from 'src/app/services/base.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  isLoading: boolean;
  userData: any;
  masterMenu: any;
  childMenu: any;
  constructor(
    public dialog: MatDialog,
    private sessionService: SessionService,
    private httpBaseService: BaseService,
    private notifyService: NotificationService,
  ) {


    this.isLoading = false;
  }

  ngOnInit() {

    const userDataJSON = this.sessionService.getSessionData();
    if (userDataJSON) {
      this.userData = JSON.parse(userDataJSON);
    }

    this.getMenuItems();
  }


  public getMenuItems() {
    this.isLoading = true;

    const url = '/common/GetMenuList';
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
        console.log(dataRes.MenuStructureList);
        this.masterMenu = dataRes.MenuStructureList;
        this.childMenu = dataRes.MenuStructureList;
      }
    },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
        this.notifyService.showError(err, "Shoppers Market");
      }
    )
  }

  getChildMenu(mainMenu:any) {
    //return this.masterMenu.filter(p => p.age < 18);
 //   console.log(mainMenu.SubMenuList);
   
    return mainMenu.SubMenuList;
  }

}

export interface MenuItems {
  Has_Child: string;
  Level_Id: number;
  Level_Name: string;
  Parent_Id: number;
  Tree_Level: string;
}

