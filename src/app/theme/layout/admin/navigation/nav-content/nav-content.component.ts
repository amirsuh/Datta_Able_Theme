import {AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
// import {NavigationItem} from '../navigation';
import {DattaConfig} from '../../../../../app-config';
import {Location} from '@angular/common';
import { LoginService } from 'src/app/demo/pages/authentication/service/login.service';
import { UserService } from 'src/app/demo/pages/authentication/service/user.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
export interface INavData {
  name?: string;
  mnuCode?: string;
  dispName?: string;
  actnUrl?: string;
  url?: string;
  href?: string;
  icon?: string;
  // badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  // attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
}
@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit, AfterViewInit {
  @Output() onNavCollapsedMob = new EventEmitter();

  public dattaConfig: any;
  public navigation: any;
  public prevDisabled: string;
  public nextDisabled: string;
  public contentWidth: number;
  public wrapperWidth: any;
  public scrollWidth: any;
  public windowWidth: number;

  @ViewChild('navbarContent', {static: false}) navbarContent: ElementRef;
  @ViewChild('navbarWrapper', {static: false}) navbarWrapper: ElementRef;

  public sidebarMinimized = false;
  public navItems: INavData[] = [];
  userPrivilege;
  isApp;
  menus
  //: INavData[] = [];
  routeName;
  sideBarElem;

  constructor( private zone: NgZone, private location: Location,private loginService: LoginService,
    private router: Router, private userService: UserService, private route: ActivatedRoute) {
      this.userService.removeSidebar().subscribe(res=>{
        if(res!=null || res!=undefined){
          this.sideBarElem=res;
        }
        else{
          this.sideBarElem=false;
        }


      })
      console.log(this.sideBarElem)
      // get User Details with the help of localstorage Added By Amir on 12-02-2021 Start
      this.userPrivilege = JSON.parse(localStorage.getItem('userDetails'))
      // get User Details with the help of localstorage Added By Amir on 12-02-2021 End

      // get User current RouterLink with the help of Router.url Added By Amir on 12-02-2021 Start

      this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
console.log(event.url)
        if ((event.url == '/' || event.url =='/auth/signin' )) {
          this.navItems = []
        }
        else {
          this.getSidebarUrls()
        }
      });

    this.dattaConfig = DattaConfig.config;
    this.windowWidth = window.innerWidth;

    // this.navigation = this.nav.get();
    this.prevDisabled = 'disabled';
    this.nextDisabled = '';
    this.scrollWidth = 0;
    this.contentWidth = 0;
  }

  ngOnInit() {


    if (this.windowWidth < 992) {
      this.dattaConfig['layout'] = 'vertical';
      setTimeout(() => {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        (document.querySelector('#nav-ps-datta') as HTMLElement).style.maxHeight = '100%';
      }, 500);
    }
  }

  getSidebarUrls() {

    this.userService.getAppDetails().subscribe(res => {
      this.isApp=res;
      localStorage.setItem("appCode", this.isApp);

      this.menus = []
      if (this.userPrivilege.application.length != 0) {
        for (let i = 0; i < this.userPrivilege.application.length; i++) {
          if (this.isApp == null) {

              this.isApp = this.userPrivilege.application[0].appCode
            }
          else{
            this.isApp=res;
          }
          if (this.userPrivilege.application[i].appCode == this.isApp) {
            let prntMnuList=this.userPrivilege.application[i].menu;
            prntMnuList.sort((a,b) => a.srtOrd > (b.srtOrd));
            for (let j = 0; j < prntMnuList.length; j++) {
              let test = {
                    id:  prntMnuList[j].dispName,
                    title:  prntMnuList[j].dispName,
                    type: 'item',
                    url: prntMnuList[j].actnUrl,
                    icon: 'feather icon-home',
                    classes: 'nav-item',

              }
              let childMenuList=prntMnuList[j].childMenu;
              if(childMenuList && childMenuList.length>0)
              {
                test["children"]=[]
                childMenuList.sort((a,b) => a.srtOrd > (b.srtOrd));
                for (let k= 0; k < childMenuList.length; k++) {
                  let child = {
                    name: childMenuList[k].dispName,
                    url: childMenuList[k].actnUrl,
                    icon: 'icon-pencil',
                    // attributes: { disabled: true }
                  }
                  test["children"].push(child)
              }
            }
              this.menus.push(test);
            }
          }
          else {
            this.navItems = []
          }
        }
        this.navigation = this.menus;
        console.log(this.navigation)
        this.navItems = this.menus;
      }
      else {
        this.menus=[]
        this.navItems = []
      }
    })
  }

  ngAfterViewInit() {
    if (this.dattaConfig['layout'] === 'horizontal') {
      this.contentWidth = this.navbarContent.nativeElement.clientWidth;
      this.wrapperWidth = this.navbarWrapper.nativeElement.clientWidth;
    }
  }

  scrollPlus() {
    this.scrollWidth = this.scrollWidth + (this.wrapperWidth - 80);
    if (this.scrollWidth > (this.contentWidth - this.wrapperWidth)) {
      this.scrollWidth = this.contentWidth - this.wrapperWidth + 80;
      this.nextDisabled = 'disabled';
    }
    this.prevDisabled = '';
    (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = '-' + this.scrollWidth + 'px';
  }

  scrollMinus() {
    this.scrollWidth = this.scrollWidth - this.wrapperWidth;
    if (this.scrollWidth < 0) {
      this.scrollWidth = 0;
      this.prevDisabled = 'disabled';
    }
    this.nextDisabled = '';
    (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = '-' + this.scrollWidth + 'px';
  }

  fireLeave() {
    const sections = document.querySelectorAll('.pcoded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('active');
      sections[i].classList.remove('pcoded-trigger');
    }

    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('active');
      } else if(up_parent.classList.contains('pcoded-hasmenu')) {
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        last_parent.classList.add('active');
      }
    }
  }

  navMob() {
    if (this.windowWidth < 992 && document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      this.onNavCollapsedMob.emit();
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig['layout'] === 'vertical') {
          parent.classList.add('pcoded-trigger');
        }
        parent.classList.add('active');
      } else if(up_parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig['layout'] === 'vertical') {
          up_parent.classList.add('pcoded-trigger');
        }
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        if (this.dattaConfig['layout'] === 'vertical') {
          last_parent.classList.add('pcoded-trigger');
        }
        last_parent.classList.add('active');
      }
    }
  }

}
