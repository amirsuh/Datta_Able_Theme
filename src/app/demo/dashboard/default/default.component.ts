import { Component, OnInit } from '@angular/core';

declare const AmCharts: any;
declare var $: any;
import { UserService } from '../../pages/authentication/service/user.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  userPrivilege;
  loading;
  constructor(private userService: UserService, private route: Router,) { }

  ngOnInit() {

    // get User Details with the help of localstorage Added By Amir on 12-02-2021 Start
    this.userPrivilege = JSON.parse(localStorage.getItem('userDetails'));
    // get User Details with the help of localstorage Added By Amir on 12-02-2021 End

    if (this.userPrivilege.application.length < 2) {
      let route = this.userPrivilege.application[0].appCode
      this.onClick(route);
    }
    else {
      let content = 'Direct dashboard Avoided due to multiple Application assigned to user'
      let action = 'close'
      // this.snackBar.info(content, action)
    }
  }

  onClick(data) {

    this.loading = true;

    // get User Clicked Url on basis of AppCode  Added By Amir on 12-02-2021 Start
    if (data) {
      switch (data) {
        case 'ER': {
          this.route.navigate(['/edit-rights']);
          this.userService.setAppDetails(data)
          break;
        }
        case 'FP': {
          this.route.navigate(['/financial-portal']);
          this.userService.setAppDetails(data)
          break;
        }
        case 'UM': {
          this.route.navigate(['/user-management']);
          this.userService.setAppDetails(data)
          break;
        }
        case 'RP': {
          this.route.navigate(['/refund-portal']);
          this.userService.setAppDetails(data)
          break;
        }
      }

    }
    // get User Clicked Url on basis of AppCode  Added By Amir on 12-02-2021 Start
  }
}
