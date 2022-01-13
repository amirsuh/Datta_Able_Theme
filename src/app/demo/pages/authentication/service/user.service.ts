import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { configuration } from "../properties/config";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDetailUrl = "";
  userDetailData: any;
  public chooseApp: BehaviorSubject<any> = new BehaviorSubject(null);
  public removeSidebars: Subject<boolean> = new Subject();
  appCodeData: any;

  constructor(private http: HttpClient) {
    this.userDetailUrl = environment.url.userManagement + configuration.partialURLs.userDetailsApi;

  }

  getUserDetail() {
    return this.http.get(this.userDetailUrl);
  }

  getRetryServiceList() {
    this.appCodeData = localStorage.getItem('appCode');
    return this.http.get(environment.url.userManagement + '/api/v1/error-retry/service-list/' +  this.appCodeData)

  }


  serviceRetry(planCode, propNo, pageNumber, pageSize) {
    let appCode = localStorage.getItem('appCode');
    let appCodeMapping = {
      "ER": environment.url.editRights,
      "FP": environment.url.financialPort,
      "RP": environment.url.refundPortal
    }
    return this.http.get(`${appCodeMapping[appCode]}/api/v1/error-retry/${appCode}/${planCode}?proposalNumber=${propNo}&pageNumber=${pageNumber}&pageSize=${pageSize}`)

  }

  retryProcess(prosData){
    let appCode = localStorage.getItem('appCode');
    console.log("proceData is::",prosData)
    let appCodeMapping = {
      "ER": environment.url.editRights,
      "FP": environment.url.financialPort,
      "RP": environment.url.refundPortal
    }
    return this.http.post<any>(`${appCodeMapping[appCode]}/api/v1/error-retry/retry`,prosData);
  }

  setUserdetails() {
    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.get(environment.url.userManagement + configuration.partialURLs.revokeToken);
  }
  getAppDetails(): Observable<any> {
    return this.chooseApp.asObservable();
  }
  setAppDetails(app) {
    this.chooseApp.next(app);
  }
  setPolicyDetails(policy: any) {
    this.chooseApp.next(policy);
  }
  setremoveSidebar(get) {
    console.log(get)
    this.removeSidebars.next(get)
  }
  removeSidebar() {
    return this.removeSidebars.asObservable();
  }

}
