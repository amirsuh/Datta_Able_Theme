import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FinancialPortalService } from '../services/financialportal.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  start: number = 0;
  end: number = 1;
  Year: any;
  prpslNumber;
  showSpinner1 = false;
  showSpinner2 = false;
  showSpinner3 = false;
  displayedColumns: string[] = ['proposalNumber', 'planCode', 'createdDate', 'ageing', 'status', 'mpn',];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;
  itemsToDisplay;
  data;
  Status: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageIndex: any;
  submitted: boolean = false;
  statusData;
  page: number = 0;
  pagesize: number = 5;
  panelOpenState = false;
  isloading: boolean = false;
  SearchForm;
  planCode;
  isFirstTime;
  count: number;
  userDetailData: any;
  isCountsClicked = false;
  isType


  constructor(private router: Router, private service: FinancialPortalService, private fb: FormBuilder) {
    this.SearchForm = this.fb.group({
      proposal: [''],
      planCode: [''],
      status: ['']
    })
    this.iniTialData()
  }
  iniTialData() {
    this.getdata();
    this.isFirstTime = true
    this.getStatus();
    this.getPlancode();
  }



  // pageNumber, pageSize,
  getCountDataInTable(type) {

    this.isType = type;
    let pagesizealt, pageno
    if (!this.paginator) {
      pagesizealt = this.pagesize.toString()
      pageno = this.page.toString()
    }
    else {
      pagesizealt = this.paginator.pageSize
      pageno = this.paginator.pageIndex
    }
    this.commonPartforCounts(pageno, pagesizealt)

  }


  onReset() {
    this.submitted = false;
    this.SearchForm.controls['planCode'].setValue(null)
    this.SearchForm.controls['status'].setValue(null)
    this.isFirstTime = true
    this.getdata();
    this.getStatus();

  }
  refreshStats(){}
  MyQueue() {
    this.showSpinner1 = true
    this.service.getstatus().subscribe(
      res => {
        this.Status = res
        this.showSpinner1 = false
      })

  }

  //search-form data from dashboard uper row
  onSubmit() {
    if (this.SearchForm.value.planCode != '' || this.SearchForm.value.status != '') {
      let pagesizealt, pageno
      if (!this.paginator) {
        pagesizealt = this.pagesize.toString()
        pageno = this.page.toString()
      }
      else {
        pagesizealt = this.paginator.pageSize
        pageno = this.paginator.pageIndex
      }
      this.isCountsClicked = false
      this.commonPartforInit_ngAfterInit(pageno, pagesizealt)
      this.isFirstTime = true;
      // this.SearchForm.reset()
    }
    else {
      // this.snackBar.success('Please select a status or plan code', 'close')
    }


  }

  onsubmitSearchPropo() {
    if (this.prpslNumber) {
      this.router.navigate(['/financial-portal/', this.prpslNumber], { skipLocationChange: true })
    }
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.paginator.page.
      subscribe(() => {
        if (this.isCountsClicked == false) {
          this.commonPartforInit_ngAfterInit(this.paginator.pageIndex, this.paginator.pageSize)
        }
        else if (this.isCountsClicked == true) {
          // this.paginator.pageIndex, this.paginator.pageSize,
          this.commonPartforCounts(this.paginator.pageIndex, this.paginator.pageSize);
        }

      })
  }

  commonPartforInit_ngAfterInit(pageNumber, pageSize) {

    this.isloading = true
    this.service.getpagelist(
      pageNumber, pageSize, this.SearchForm.value.status, this.SearchForm.value.planCode, (response) => {
        this.itemsToDisplay = response.content;
        this.pageIndex = response.totalElements
        this.dataSource = new MatTableDataSource(this.itemsToDisplay);
        if (this.isFirstTime) {
          this.paginator.pageIndex = 0;
          this.isFirstTime = false
          this.count = 0
        }
        this.dataSource.sort = this.sort;
        if (response.content.length < 1) {
          let content = 'Data not Found for your query'
          let action = 'close'
          // this.snackBar.success(content, action)
        }
        else if (this.count == 0) {
          this.count++
          let content = 'Data Found successfully'
          let action = 'close'
          // this.snackBar.success(content, action)
        }
        this.isloading = false

      }, (error) => {
        let content = 'Error occurred while fetching data.'
        let action = 'close'
        // this.snackBar.success(content, action)
        this.isloading = false
      });

  }

  commonPartforCounts(pageNo, pageSize) {

    this.isCountsClicked = true;
    this.service.getCompltedCount(this.isType, pageNo, pageSize, (response) => {
      this.itemsToDisplay = response.content;
      this.pageIndex = response.totalElements
      this.dataSource = new MatTableDataSource(this.itemsToDisplay);
      if (this.isFirstTime) {
        this.paginator.pageIndex = 0;
        this.isFirstTime = false
        this.count = 0
      }
      this.dataSource.sort = this.sort;
      if (response.length < 1) {
        let content = 'Data not Found for your query'
        let action = 'close'
        // this.snackBar.success(content, action)
      }
      else if (this.count == 0) {
        this.count++
        let content = 'Data Found successfully'
        let action = 'close'
        // this.snackBar.success(content, action)
      }
      this.isloading = false
    }, (error) => {
      let content = 'Error occurred while fetching data.'
      let action = 'close'
      // this.snackBar.success(content, action)
      this.isloading = false
    });
  }

  getdata() {

    let pagesizealt, pageno
    if (!this.paginator) {
      pagesizealt = this.pagesize.toString()
      pageno = this.page.toString()
    }
    else {
      pagesizealt = this.paginator.pageSize
      pageno = this.paginator.pageIndex
    }
    this.isCountsClicked = false
    this.commonPartforInit_ngAfterInit(pageno, pagesizealt)

  }

  getStatus() {

    this.service.getStatusType().subscribe(response => {
      console.log(response);
      this.statusData = response;
    })
  }
  getPlancode() {
    this.service.getPlancode().subscribe(response => {
      console.log(response)
      this.planCode = response
    })
  }

  records = [
    { id: 1, mpn: '889880', subCategories: [{ proposalNo: 34099, planCode: 87236, date: '2012/01/01', ageing: '2012/01/01', status: 'assigned', }] }
  ]

  ngOnInit(): void {
  }

  onClick(data = {}, uri: string) {

    const tfpCaseId = data['tfpCaseId'] || 0;
    const tskInstcId = data['tskInstcId'] || 0;
    const taskCode = data['taskCode'] || 0
    console.log({ BeforeNavigation: [tfpCaseId, tskInstcId, taskCode] })
    if (tskInstcId == 0 && taskCode == 0) {
      this.prpslNumber = data['proposalNumber'];
      this.onsubmitSearchPropo()
      return;
    }
    this.router.navigate(['/financial-portal/task/', tfpCaseId, tskInstcId, taskCode], { skipLocationChange: true }).then(() => {
      this.router.navigate([uri]);
    }).catch(error => {
      console.log({ error })
    })

  }

  onredirect() {
    this.router.navigate(['/financial-portal/financial-user-admin'])
  }

}

export interface PeriodicElement {
  proposalNumber: string;
  mpn: string;
  planCode: string;
  createdDate: string;
  ageing: string;
  status: string;
}
