import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/map'
import { getLocaleTimeFormat } from '@angular/common';
import {Document,DocumentType} from '../shared/document.module';

@Injectable({
  providedIn: 'root'
})
export class CreateProposalService {

  constructor(public http: HttpClient) { }
  documents=[];
  document=[]
  private policyDetails: BehaviorSubject<any> = new BehaviorSubject(null);

  private categoryForm: BehaviorSubject<any> = new BehaviorSubject(null);

  getPolicyDetails(): Observable<any> {
    return this.policyDetails.asObservable();
  }

  setPolicyDetails(policy: any) {
    this.policyDetails.next(policy);
  }

  getCategoryForm(): Observable<any> {
    return this.categoryForm.asObservable();
  }
  setCategoryForm(formData) {
    this.categoryForm.next(formData);
  }

  public getProposalData() {

    let getProposalDataUrl = environment.url.editRights + '/api/v1/proposal-data/create';
    return this.http.get(getProposalDataUrl).map(request => this.mapCategoryRequestData(request));;
  }
  mapCategoryRequestData(request){

    this.document=[]
    for(let i=0;i<request.length;i++){
      let abcd={
        categoryName:request[i].categoryName,
        categoryCode:request[i].categoryCode,
        reasons:request[i].reasons,
        subCategories:this.getSubCategoryList(request[i].subCategories),
      }
      this.document.push(abcd)

    }
    return this.document;
  }

  getSubCategoryList(subcat){
   let subCate=[];
   if(subcat!=null && subcat.length>0){
    for(let i=0;i<subcat.length;i++){
      let sub={
        code:subcat[i].code,
        name:subcat[i].name
      }
      subCate.push(sub)
    }
    return subCate;
   }
  }
  public getNewErRequestData(newReqid, formData) {

    let body =
    {
      "proposalNumber": newReqid,
      "requestCategory": formData?.categoryId || null,
      "requestSubCategory": formData?.subCategoryID || null,
      "reason": formData?.reason || null,
      "requestorRemarks": null,
      "fundTransferFrom": formData?.fromNumber || null,
      "fundTransferTo": formData?.toNumber || null
    }
    console.log(body)
    let getProposalDataUrl = environment.url.editRights + `/api/v1/proposal-data/search`;
    return this.http.post(getProposalDataUrl, body).map(request => this.mapSaveRequestData(request));
  }

  saveEdiRightRequest(body){
    let saveProposalDataUrl= environment.url.editRights +`/api/v1/proposal-data`
    return this.http.post(saveProposalDataUrl, body).map(request => this.mapSaveRequestData(request));
  }

  mapSaveRequestData(request){
  // let requestData={
  //   status : request.status,
  //   requestNumber : request.requestNumber,
  //   errorMessages:request.errorMessages
  // }
  return request;
  }

  public getEditRightsViewData(requestNumber){

    let getEditRightsViewDataUrl= environment.url.editRights + `/api/v1/proposal-data/requestNumber/${requestNumber}`
    return this.http.get(getEditRightsViewDataUrl).map(request => this.mapResponseData(request));
   }

   mapResponseData(request){
     if(request.editRightProposalView){
      return request;
     }
     else{
       return request;
     }

   }
   public uploadFile(fileList,proposalNumber,docType){

    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('file', file, file.name);
      let headers = new HttpHeaders();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      let options = { headers: headers };
      let getUploadFileUrl= environment.url.editRights + `/api/v1/documents/${proposalNumber}`
      return this.http.post(getUploadFileUrl, formData, options).map(request => this.mapFilUploadData(request,docType));
  }
   }
   mapFilUploadData(request,docType) {
    console.log(request,docType)

    let xyz:DocumentType,{}={};
    xyz={
      docId:docType.documentId,
      docName:docType.documentName,
      transDocId : request.transDocId,
      fileName :request.fileName
    }
    // console.log(roleData)
    return xyz;
  }

  downloadFile(file){
    let getDownloadFileUrl = environment.url.editRights + `/api/v1/documents/download/${file}`;
    return this.http.get(getDownloadFileUrl, { responseType: 'blob' });
  }

  getSelectDocumentList(){
    let getSelectDocumentList = environment.url.editRights + `/api/v1/masters-epic/fetch-doc-list`;
    return this.http.get(getSelectDocumentList).map(request=>this.mapSelectDocumentList(request));

  }

  mapSelectDocumentList(request){
    this.documents=[]
    for(let i=0;i<request.length;i++){
      let abc:Document={
        documentId:request[i].documentId,
        documentName:request[i].documentName
      }
      this.documents.push(abc)

    }
    return this.documents;
  }
}
