import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialPortalService {

  private roleData: BehaviorSubject<any> = new BehaviorSubject(null);
  private tfpFinDetailsId: BehaviorSubject<[]> = new BehaviorSubject(null);
  private typeOfProfitis: BehaviorSubject<any> = new BehaviorSubject(null);
  delIds=[]
  constructor( private http: HttpClient) { }

  getdatalist(pageNumber,pageSize,status,planCode,succesCB, errorCB){
    let params = new HttpParams();
    params = params.append('pageNo',pageNumber);
    params = params.append('pageSize', pageSize);
    params = params.append('status',status);
    params = params.append('planCode', planCode);
    // let getDataListUrl =
    //environment.url.financialPort + `/api/v1/user-dashboard/task-data?status=${status ||''}&planCode=${planCode ||''}`;
    // (environment.url.financialPort + `/api/v1/user-dashboard/task-data?`,{params: params})
    return this.http.get(environment.url.financialPort + `/api/v1/user-dashboard/task-data?`,{params: params}).subscribe(data => {
      succesCB(data)
      console.log(data)
    }, error => errorCB());
  }
  getStatusType(){
    let getStatusUrl = environment.url.financialPort+'/api/v1/master/status-list'
    return this.http.get(getStatusUrl)
  }
  getPlancode() {
    let getPlancodeUrl = environment.url.financialPort + '/api/v1/master/plancode'
    return this.http.get(getPlancodeUrl);
  }
  getPolicyDetails(): Observable<any> {
    return this.roleData.asObservable();
  }
  deleteSingleForm(id){
    this.tfpFinDetailsId.next(id);
  }
  getDeleteSingleForm(){

    return this.tfpFinDetailsId.asObservable();
  }
  settypeOfProfit(type){
   this.typeOfProfitis.next(type);
  }
  gettypeOfProfit(): Observable<any> {
    return this.typeOfProfitis.asObservable();
  }
  getAssigTo() {
    let getAssigUrl = environment.url.financialPort + '/api/v1/master/assignTo'
    return this.http.get(getAssigUrl);
  }

  getStatusReassig(){
    let getStatusUrl = environment.url.financialPort+'/api/v1/master/admin-status'
    return this.http.get(getStatusUrl)
  }

//   addData(dataObj) {

//     const currentValue = this.tfpFinDetailsId.value;
//     const updatedValue = [...currentValue, dataObj];
//     this.tfpFinDetailsId.next(updatedValue);
// }


  setPolicyDetails(roleData: any) {
    this.roleData.next(roleData);
  }
  getstatus(){
    let getStatusDataUrl = environment.url.financialPort + '/api/v1/user-dashboard/stats'
    return this.http.get(getStatusDataUrl);
  }

  getlistDashboard(queryParam:String, succesCB, errorCB){
    const dashboardList ='api/v1/proposal-data/task?tfpCaseId=27&tskInstcId=0&taskCode=MAKER'
    return this.http.get(`${environment.url.financialPort + dashboardList + queryParam}`).subscribe(data=>{
      succesCB(data)
    },error => errorCB()
    )
  }
  getservice(tfpCaseId,tskInstcId = '',maker){
    const queryParams = `?tfpCaseId=${tfpCaseId}&tskInstcId=${tskInstcId}&taskCode=${maker}`;
    console.log("query params",queryParams);
    let getServiceDataUrl = environment.url.financialPort + `/api/v1/proposal-data/task${queryParams}`
    return this.http.get(getServiceDataUrl)
  }

  getSearchedData(prpslNmbr){
    let getStatusDataUrl = environment.url.financialPort + `/api/v1/proposal-data/search/${prpslNmbr}`
    return this.http.get(getStatusDataUrl);
  }
    //getting data financial year

    getFinancialYears(): Observable<any>{
      let getFinancialYearDataUrl = environment.url.userManagement + '/api/v1/financial-Year/display'
      return this.http.get<any>(getFinancialYearDataUrl);
    }
    getComonDrop():Observable<any>{
      let getCommonDropDownDataUrl = environment.url.financialPort + '/api/v1/masters/income-type'
      return this.http.get<any>(getCommonDropDownDataUrl);
    }

    getDocList(): Observable<any>{
      let gedocListDataUrl = environment.url.financialPort + '/api/v1/documents/doc-list';
      return this.http.get<any>(gedocListDataUrl);
    }

    //Document save and send

    submitIncomeData(data):Observable<any>{
      let submitIncomeDataUrl = environment.url.financialPort + '/api/v1/financial-portal/addFPDetails';
      return this.http.post<any>(submitIncomeDataUrl, data);
    }

    submitStaticData(data){
      let submitIncomeDataUrl = environment.url.financialPort + '/api/v1/epic-services/create-new-fp-task';
      return this.http.post<any>(submitIncomeDataUrl, data);

    }


    getpagelist(pageNumber,pageSize,status,planCode, succesCB, errorCB) {
     if(status==null){
       status=''
     }
     if(planCode==null){
      planCode=''
    }
      let params = new HttpParams();
      params = params.append('pageNo',pageNumber);
      params = params.append('pageSize', pageSize);
      params = params.append('tskStatus',status);
      params = params.append('planCode', planCode);
      return this.http.get(environment.url.financialPort + `/api/v1/user-dashboard/task-data?`,{params: params}).subscribe(data => {
        succesCB(data)
        console.log(data)
      }, error => errorCB())
    }

    getCompltedCount(type,pageNumber,pageSize,succesCB, errorCB){
      let params = new HttpParams();
      params = params.append('pageNo',pageNumber);
      params = params.append('pageSize', pageSize);
      return this.http.get(environment.url.financialPort + `/api/v1/progressCount/${type}`,{params: params}).subscribe(data => {
        succesCB(data)
        console.log(data)
      }, error => errorCB())
    }
    // getProgrssCount(succesCB, errorCB){
    //   return this.http.get(environment.url.financialPort + `/api/v1/progressCount/progress`).subscribe(data => {
    //     succesCB(data)
    //     console.log(data)
    //   }, error => errorCB())
    // }
    // getPendingCount(succesCB, errorCB){
    //   return this.http.get(environment.url.financialPort + `/api/v1/progressCount/pending`).subscribe(data => {
    //     succesCB(data)
    //     console.log(data)
    //   }, error => errorCB())
    // }

    getAdmin(): Observable<any>{
      // let adminlistUrl = 'http://192.168.6.41:8083/financial-portal/api/v1/admin-data/data';
      let adminlistUrl = environment.url.financialPort + '/api/v1/admin-data/data'
      return this.http.get<any>(adminlistUrl);
    }


    getReassignDash(pageNumber,pageSize,proposalNumber,usrId,tskCode,tskStatus,sortby,sortOrder,ftsarLessThan,ftsarGreaterThan,planCode,succesCB, errorCB){

      if(proposalNumber==undefined)proposalNumber='';
      if(usrId==undefined) usrId='';
      if(tskCode==undefined)tskCode='';
      if(tskStatus==undefined)tskStatus='';
      if(sortby==undefined)sortby='';
      if(sortOrder==undefined)sortOrder='';
      if(ftsarLessThan==undefined) ftsarLessThan='';
      if(ftsarGreaterThan==undefined) ftsarGreaterThan='';
      if(planCode==undefined) planCode='';
      let params = new HttpParams();
      params = params.append('pageNumber',pageNumber);
      params = params.append('pageSize', pageSize);
      params = params.append('proposalNumber', proposalNumber);
      params = params.append('usrId',usrId);
      params = params.append('tskCode', tskCode);
      params = params.append('tskStatus', tskStatus);
      params = params.append('sortBy', sortby);
      params = params.append('sortOrder', sortOrder);
      params = params.append('ftsarLessThan', ftsarLessThan);
      params = params.append('ftsarGreaterThan', ftsarGreaterThan);
      params = params.append('planCode', planCode || '');
      return this.http.get(environment.url.financialPort + `/api/v1/admin-data/fpclaim?`,{params: params}).subscribe(data => {
        succesCB(data)
        console.log(data)
      }, error => errorCB());
    }

    reassignSave(Data:any):Observable<any>{
      let reassignDataUrl = environment.url.financialPort + '/api/v1/admin-data/reassign';
      return this.http.post<any>(reassignDataUrl, Data);
    }

    getTaskList(){
      let taskListDataUrl = environment.url.financialPort + '/api/v1/master/fptasklist'
      return this.http.get<any>(taskListDataUrl);
    }
    getStatusList(){
      let statusDataUrl =environment.url.financialPort + '/api/v1/master/admin-status'
      return this.http.get<any>(statusDataUrl);
    }

}
