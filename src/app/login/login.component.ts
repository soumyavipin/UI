import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../services/base.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../services/session.service';
import { UserDetails } from '../UserDetails';
import { NotificationService } from '../services/notification.service';
import { EncryptService } from '../services/encrypt.service';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {


  userName: any;
  password: any;
  otp: any;
  preValidate: boolean;
  isLoading: boolean;

  constructor(
    private router: Router,
    private httpBaseService: BaseService,
    private sessionService: SessionService,
    private http: HttpClient,
    private notifyService: NotificationService,
    private crypto: EncryptService,
    private navBarService: NavbarService
  ) {
    // localStorage.removeItem('userdetails');
    localStorage.removeItem('secureKey');
    this.preValidate = false;
    this.isLoading = false;

    this.userName="neethu";
    this.password="1234567890";
  }

  ngOnInit(): void {

  }

  // ngOnInit(): void {
  //   //this.navBarService.hide();
  // }
  // ngOnDestroy(): void {
  //   this.navBarService.display();
  // }

  public authenticateUser() {
    const url = '/login/PreValidateUserLogin';
    const data = { UserName: this.userName, Password: this.password };
    this.isLoading = true;

    this.httpBaseService.post(url, data).subscribe((data: any) => {
      if (data) {
        if (data.Response_Message == "success") {
          this.preValidate = true;
          this.isLoading = false;
        }
      }
    },
      (err: any) => {

        console.log(err);
        this.notifyService.showError(err, "Shoppers Market");
        this.isLoading = false;
      }
    )



  }
  test(){
    alert(this.userName);
  }

  login() {

    this.isLoading = true;
    const url = '/login/ValidateUserLogin';
    const data = { User_Name: this.userName, Otp: this.otp, App_Id: 77 };
    this.httpBaseService.post(url, data).subscribe((data: any) => {

      const userSession = new UserDetails();
      userSession.Auth_Token = data.Auth_Token;
      userSession.Bank_Date = data.User_Global_Data.Gld_Today;
      userSession.Application_Id = data.User_Global_Data.Gli_Application_Id;
      userSession.Company_Id = data.User_Global_Data.Gli_Company_Id;
      userSession.User_Branch_Id = data.User_Global_Data.Gli_User_Branch_Id;
      userSession.User_Id = data.User_Global_Data.Gli_User_Id;
      userSession.Year_Id = data.User_Global_Data.Gli_Year_Id;
      userSession.Address = data.User_Global_Data.Gls_Address;
      userSession.Branch_Name = data.User_Global_Data.Gls_Branch_Name;
      userSession.Fin_Year = data.User_Global_Data.Gls_Fin_Year;
      userSession.Mobile_No = data.User_Global_Data.Gls_Mobile_No;
      userSession.User_Name = data.User_Global_Data.Gls_User_Name;
      userSession.User_Status = data.User_Global_Data.Gls_User_Status;
      userSession.Bank_Id = 0;
      userSession.Node_Id = 0;
      localStorage.setItem('secureKey', data.User_Global_Data.Sec_Key);


      this.httpBaseService.isLoggedIn = true;
      this.sessionService.setSessionData(userSession);
      this.isLoading = false;
      this.router.navigate(['/home']);


    },

      (err: any) => {
        this.isLoading = false;
        console.log(err);
        this.notifyService.showError(err, "Shoppers Market");

      })

  }









}
