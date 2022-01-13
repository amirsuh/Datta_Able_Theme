import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatSnackBar } from '@angular/material/snack-bar';
import 'rxjs/add/operator/retry'
import { User } from '../model/user.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  errorMessage: string = null;
  loading = false;
  loginForm: FormGroup;
  constructor(private fb:FormBuilder,private loginService: LoginService, private userService: UserService, private router: Router,) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
  }
  onSubmit(isResubmit:boolean=false) {

    this.errorMessage = "Processing";
    this.loading = true;
    // this.router.navigate(['/dashboard']);
    if (!this.loginForm.valid) {
      // this.router.navigate(['/dashboard']);
      return;
    }
    // console.log(form);
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    // debugger;
    this.loginService.login(username, password).subscribe(response => {
      console.log(response);
      setTimeout(() => {
        this.userService.getUserDetail().subscribe(response => {
          console.log(response);
          localStorage.setItem('userDetails', JSON.stringify(response))
          this.errorMessage = "Success";
          this.loading = false;
          let content = 'LogIn Successfully'
          let action = 'close'
          // this.snackBar.success(content, action)
          this.loginForm.reset();
          this.router.navigate(['/dashboard/default']);
        }, error => {
          console.log("error error error")
          this.handleError(error);
        });

      }, 1000);


    }, error => {
      this.handleError(error, () => {
        // The call back function is for relogin, if error accurs checks the isResubmit flag if true then the call back function will not excute.
        // it excutes for only when flag is false.
        console.log("relogin")
        if(!isResubmit){
          this.onSubmit(isResubmit=true)
        }
      });
     }
    );
    // form.reset();
  }

  handleError(error, func?) {
    // debugger;
    console.log(error);
    if (error.error.error === "unauthorized" && error.error.error_description.startsWith("USER_LOGED_IN")) {
      let token = error.error.error_description.split("||")[1];
      console.log(token);

      swal({
        title: "Are you sure?",
        text: "Already Logged In, Do u want to logout previous login ?",
        // icon: "warning",
        buttons: [true, true],
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc: false
      })
        .then((willDelete) => {
          if (willDelete) {
            let dateToday = new Date();
            dateToday.setDate(dateToday.getDate() + 1);
            const user = new User(token, "", dateToday);
            this.loginService.user.next(user);
            this.loading = false;
            this.loginService.logout();
            swal("Re login has been succeed!", {
              icon: "success",
              closeOnClickOutside: false,
              closeOnEsc: false
            });
            func();
          } else {
            this.loading = false;
            swal("Already Logged In!", {
              closeOnClickOutside: false,
              closeOnEsc: false
            });
          }
        });

    }
    else if (error.error.error === "unauthorized") {
      this.errorMessage = "Invalid Username or Password";
      // let content=this.errorMessage
      // let action='close'
      this.loading = false;
      // this.errorMessage = error.error.errorMessages[0];
      let content = this.errorMessage;
      //  error.error.errorMessages[0]
      let action = 'close'
      // this.snackBar.error(content, action)

    } else {
      this.errorMessage = "Error";
      this.loading = false;
      let content = error.statusText
      let action = 'close'
      // this.snackBar.error(content, action)
    }
    this.loginService.logout();
  }

}
