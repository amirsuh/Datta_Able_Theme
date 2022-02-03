import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configuration } from 'src/app/demo/pages/authentication/properties/config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditRightsDashboardService {

  constructor(private http:HttpClient,) { }


  getpagelist(startDate,endDate,prpslNo,sortby,sortOrder,pageNumber,pageSize, succesCB, errorCB) {
    let startDt;
    let endDt;
    if(startDate && endDate && (typeof(startDate)!='function')){
       startDt=startDate.replace(/\-/g,'/')
       endDt=endDate.replace(/\-/g,'/')
    }
    else{
      startDt='';
      endDt='';
    }
    if(sortby==undefined)sortby='';
    if(sortOrder==undefined)sortOrder='';
    let params = new HttpParams();
    params = params.append('startDt',startDt);
    params = params.append('endDt',endDt);
    params = params.append('sortBy', sortby);
    params = params.append('sortOrder', sortOrder);
    params = params.append('pageNo',pageNumber);
    params = params.append('pageSize', pageSize);

    return this.http.get(environment.url.editRights + configuration.partialURLs.dashboardList+`${prpslNo ||'-'}?`,{params: params}).subscribe(data => {
      succesCB(data)
      console.log(data)
    }, error => errorCB())
  }

  // public getEditRightsViewData(requestNumber){

  //  let getEditRightsViewDataUrl= environment.url.editRights + `/api/v1/proposal-data/requestNumber/${requestNumber}`
  //  return this.http.get(getEditRightsViewDataUrl);
  // }

  mapEditRightRequestData(request){
   return request

  }

  public getstatus(){
    let getStatusUrl= environment.url.editRights + `/api/v1/er-dashboard/stats`
    return this.http.get(getStatusUrl);
  }
}
