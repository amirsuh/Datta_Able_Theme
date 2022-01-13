import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { User } from '../model/user.model';
import { UserService } from './user.service';
import swal from 'sweetalert';

export class LoginResponseData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user = new BehaviorSubject<User>(null);
  userDetails;
  public loginUrl: string = "";

  private basicAuth: string = "";
  private tokenExpirationTimer: any;

  private readonly CONST_USER_DATA = "userData";
  private readonly CONST_USER_DETAILS = "userDetails";

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.loginUrl = environment.url.userManagement + "/oauth/token";
    this.basicAuth = "Basic " + window.btoa(environment.oauthClientId + ":" + environment.oauthClientSecret);
  }

  public autoLogin() {
    const userDataString = localStorage.getItem(this.CONST_USER_DATA);
    // console.log("userDataString " + userDataString);

    const userData = JSON.parse(userDataString);
    if (!userData) {
      return null;
    }
    const expirationDate = new Date(userData._tokenExpirationDate);
    const loadedUser = new User(
      userData._token,
      userData._refreshToken,
      expirationDate
    );
    // console.log(loadedUser.token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const timeToLogout = expirationDate.getTime() - new Date().getTime();
      console.log("timeToLogout ::" + timeToLogout);

      this.autoLogout(timeToLogout);
    }
  }

  public logout() {
    this.userService.setUserdetails().subscribe(res => {
      console.log(res)
    });
    this.user.next(null);
    localStorage.removeItem(this.CONST_USER_DATA);
    localStorage.removeItem(this.CONST_USER_DETAILS)
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.router.navigate(["/auth/signin"]);
    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    // this.http.post(environment.url.userManagement + '/oauth/revoke-token',{}, {headers}).subscribe();
  }

  autoLogout(expirateionDuration: number) {
    expirateionDuration = expirateionDuration - (180 * 1000);
    console.log("expirateionDuration:::",expirateionDuration)
    this.tokenExpirationTimer = setTimeout(() => {
      // TODO logout auto
      // if (window.confirm('You May Logout Due to Time Expiration,Do You want to coutinue ?')) {

      //   this.refreshToken(this.user.value.refreshToken).subscribe(response => {
      //     console.log(response);
      //   });
      // } else {
      //   this.logout();
      // }

      swal({
        title: "Session Timeout!",
        text: "You're being timed out due to inactivity.",
        // buttons: ["Stay Logged In","Log Out"],
        // buttons: ["Log Out","Stay Logged In"],
        buttons: {
          confirm: {
            text: "Stay Logged In",
            value: true,
            visible: true,
            className: "swal-button--cancel",
            closeModal: true,
          },
          cancel: {
            text: "Log Out",
            value: false,
            visible: true,
            className: "swal-button--danger",
            closeModal: true
          },
        },
        // dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc: false,
        timer: 170000,
      })
      .then((willDelete) => {
        console.log((willDelete))
        if (!willDelete) {
          this.logout();
          swal("You were Logged out!", {
            icon: "success",
            closeOnClickOutside: false,
            closeOnEsc: false
          });
        } else {
          this.refreshToken(this.user.value.refreshToken).subscribe(response => {
            console.log(response);
          });
          swal("You are safe!",{
            closeOnClickOutside: false,
            closeOnEsc: false
          });
        }
      });
    }
      ,
      expirateionDuration);


  }

  public login(username, password) {

    let body = new FormData();
    body.append('grant_type', "password");
    body.append('username', username);
    body.append('password', password);
    return this.http.post<LoginResponseData>(this.loginUrl, body
      , {
        headers: {
          Authorization: this.basicAuth
        }
      })
      .pipe(
        // catchError(this.handleError),
        tap(resData => {
          this.processResposne(resData);

        })
      );

  }

  public refreshToken(refreshToken) {

    let body = new FormData();
    body.append('grant_type', "refresh_token");
    body.append('refresh_token', refreshToken);

    return this.http.post<LoginResponseData>(this.loginUrl, body
      , {
        headers: {
          Authorization: this.basicAuth
        }
      })
      .pipe(
        // catchError(this.handleError),
        tap(resData => {
          this.processResposne(resData);

        })
      );

  }

  public processResposne(resData) {
    console.log('user resData ::' + resData);
    const expirationDate = new Date(new Date().getTime() + resData.expires_in * 1000);
    const user = new User(resData.access_token, resData.refresh_token, expirationDate);
    this.user.next(user);

    this.autoLogout(resData.expires_in * 1000);
    localStorage.setItem(this.CONST_USER_DATA, JSON.stringify(user));

  }


}
