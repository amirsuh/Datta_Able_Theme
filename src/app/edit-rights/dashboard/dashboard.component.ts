import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EditRightsDashboardService } from '../services/edit-rights-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  itemsToDisplay;
  data: any;
  page: number = 0;
  pagesize: number = 10;
  totalPages = [1];
  currentPage = 1;
  isLoadingResults;
  pageIndex;
  loading = false;
  displayedColumns: string[] = ['rqstNmbr', 'prpslNmbr', 'catName', 'subCatName', 'stsName', 'createdOn', 'completedDate'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  proposalListFilterForm: FormGroup;
  reqNumber;
  errorMessage: any;
  leaveTypeMinDate: string;
  minDate: string = null;
  maxDate: string = null;
  leaveTypeMaxDate: string;
  leaveRequest;
  tomorrow = new Date();
  @Input() max: any;
  submitted: boolean = false;
  showSpinner1 = false;
  Status: any;
  date;
  isloading = false;
  isStartDate = false
  enddate
  isFirstTime;
  isDataEmpty;
  isProposalNumber;
  count: number = 0;
  sortBy;
  sortOrder;
  constructor(public datepipe: DatePipe, @Inject(DOCUMENT) private _document: any, private router: Router, private formBuilder: FormBuilder, private service: EditRightsDashboardService,) {
    this.proposalListFilterForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      proposalNumber: [''],
    })
    this.initialData()
    this.dataSource.paginator = this.paginator;
    this.tomorrow.setDate(this.tomorrow.getDate());
  }

  // public themeColors(): void {
  //   Array.from(this._document.querySelectorAll('.theme-color')).forEach((el: HTMLElement) => {
  //     const background = getStyle('background-color', el);
  //     const table = this._document.createElement('table');
  //     table.innerHTML = `
  //       <table class="w-100">
  //         <tr>
  //           <td class="text-muted">HEX:</td>
  //           <td class="font-weight-bold">${rgbToHex(background)}</td>
  //         </tr>
  //         <tr>
  //           <td class="text-muted">RGB:</td>
  //           <td class="font-weight-bold">${background}</td>
  //         </tr>
  //       </table>
  //     `;
  //     el.parentNode.appendChild(table);
  //   });
  // }

  initialData() {

    let date = new Date();
    let enddate = new Date();
    let start_date;

    start_date = date;
    let dateBeforeOneweak = new Date(enddate.setDate(enddate.getDate() - 7));
    this.date = dateBeforeOneweak;
    this.enddate = date;
    this.getDatas(dateBeforeOneweak, date);
    this.submitted = true;
    this.isFirstTime = true
  }
  ngOnInit(): void {

    this.Status = ''
    // this.themeColors();

  }

  get f() { return this.proposalListFilterForm.controls; }

  startEdit(i, id) {

    this.router.navigate(["/user-management/add-lookup", id]);
    console.log(i, id)
  }

  sortData(sort: Sort, datas){
    let activealt,activealtorder
    if (sort.active == 'createdOn') {
      activealt = 'createdOn'
      activealtorder=sort.direction
    }

    if(sort.direction==""){
      activealt = ''
      activealtorder=''
    }
    this.sortBy=activealt;
    this.sortOrder=activealtorder;
    let pagesizealt
    if (!this.paginator) {
      pagesizealt = this.pagesize.toString()
    }
    else {
      pagesizealt = this.paginator.pageSize
    }
    this.commonPartforInit_ngAfterInit(this.date, this.enddate,this.paginator.pageIndex,pagesizealt)
  }


  refreshStats() {

    this.showSpinner1 = true
    this.service.getstatus().subscribe(
      res => {
        this.Status = res
        let content = 'Requested data found'
        let action = 'close'
        // this.snackBar.success(content, action)
        this.showSpinner1 = false
      }, error => {
        if (error) {
          this.showSpinner1 = false
          let content = 'Requested data not found'
          let action = 'close'
          // this.snackBar.error(content, action)
        }

      })

  }

  searchEditRightRequestData() {

    this.date = new Date();
    this.submitted = true;

    if (this.proposalListFilterForm.value.proposalNumber && !this.proposalListFilterForm.value.startDate) {
      this.isFirstTime = true;
      this.getDatas('', '')
    }
    else {
      if (!this.proposalListFilterForm.value.endDate) {
        let content = 'Please Select end date'
        let action = 'close'
        // this.snackBar.success(content, action)

      }
      else {

        if ((Date.parse(this.proposalListFilterForm.value.endDate) < Date.parse(this.proposalListFilterForm.value.startDate))) {
          let content = 'End date must be greater than start date'
          let action = 'close'
          // this.snackBar.success(content, action)
        }
        else {
          this.isFirstTime = true;
          this.getDatas(this.proposalListFilterForm.value.startDate, this.proposalListFilterForm.value.endDate)

        }
      }
    }
  }

  getDatas(startDate, enddate) {
    let pagesizealt,pageno
    if (!this.paginator) {
      pagesizealt = this.pagesize.toString()
      pageno = this.page.toString()
    }
    else {
      pagesizealt = this.paginator.pageSize
      pageno = this.paginator.pageIndex
    }
    this.commonPartforInit_ngAfterInit(startDate, enddate, pageno, pagesizealt)

  }

  ngAfterViewInit() {

    this.paginator.page.
      subscribe(() => {
        this.commonPartforInit_ngAfterInit(this.date, this.enddate, this.paginator.pageIndex, this.paginator.pageSize)
      })
  }

  commonPartforInit_ngAfterInit(startDate, enddate, pageNumber, pageSize) {

    let start_Date
    let end_date
    this.isloading = true

    if (startDate != '' && enddate != '') {
      start_Date = this.datepipe.transform(startDate, 'dd-MM-yyyy')
      end_date = this.datepipe.transform(enddate, 'dd-MM-yyyy')
      this.date = startDate
      this.enddate = enddate
    }

    else {
      start_Date = this.datepipe.transform(this.proposalListFilterForm.value.startDate, 'dd-MM-yyyy')
      end_date = this.datepipe.transform(this.proposalListFilterForm.value.endDate, 'dd-MM-yyyy')
      if (this.isFirstTime) {
        this.date = ''
        this.enddate = ''
      }

    }


    this.service.getpagelist(start_Date, end_date, this.proposalListFilterForm.value.proposalNumber,this.sortBy,this.sortOrder,
      pageNumber, pageSize, (response) => {
        this.itemsToDisplay = response.content;
        this.pageIndex = response.totalElements
        this.dataSource = new MatTableDataSource(this.itemsToDisplay);
        this.dataSource.sort = this.sort;
        if (this.isFirstTime) {
          this.paginator.pageIndex = 0;
          this.isFirstTime = false
          this.count = 0
        }
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
  gotosaveEditRightsWithRequestNumber(url) {

    if (url != '') {
      this.router.navigate(['/edit-rights/save-edit-rights-request/', url], { skipLocationChange: true });
    }
    else {
      this.router.navigate(['/edit-rights/save-edit-rights-request/', this.reqNumber], { skipLocationChange: true });
    }

  }

  handleError(error) {

    console.log(error)
    if (error.error.errorMessages.length != 0) {
      this.errorMessage = error.error.errorMessages[0];
      let content = error.error.errorMessages[0]
      let action = 'close'
      // this.snackBar.error(content, action)
      console.log(this.errorMessage)
    } else {
      this.errorMessage = ["Error"];
    }
  }

  clearSearch() {

    this.proposalListFilterForm.controls['startDate'].setValue('');
    this.proposalListFilterForm.controls['endDate'].setValue('');
    this.proposalListFilterForm.controls['proposalNumber'].setValue('');
    this.initialData()

  }
}
