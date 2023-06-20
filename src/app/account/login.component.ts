// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { ActivatedRoute, Router } from "@angular/router";
// import { AccountService } from "@app/services";
// import { first } from "rxjs/operators";

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })

// export class LoginComponent implements OnInit {
//   form!: FormGroup;
//   loading = false;
//   submitted = false;
//   error?: string;
//   success?: string;

//   constructor(
//       private formBuilder: FormBuilder,
//       private route: ActivatedRoute,
//       private router: Router,
//       private accountService: AccountService
//   ) {
//       // redirect to home if already logged in
//       if (this.accountService.userValue) {
//           this.router.navigate(['/']);
//       }
//   }

//   ngOnInit() {
//       this.form = this.formBuilder.group({
//           username: ['', Validators.required],
//           password: ['', Validators.required]
//       });

//        // show success message after registration
//        if (this.route.snapshot.queryParams.registered) {
//         this.success = 'Registration successful';
//     }
//   }

//   // convenience getter for easy access to form fields
//   get f() { return this.form.controls; }

//   onSubmit() {
//       this.submitted = true;

//       // reset alert on submit
//       this.error = '';
//       this.success = '';

//       // stop here if form is invalid
//       if (this.form.invalid) {
//           return;
//       }

//       this.loading = true;
//       this.accountService.login(this.f.username.value, this.f.password.value)
//           .pipe(first())
//           .subscribe({
//               next: () => {
//                   // get return url from query parameters or default to home page
//                   const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/starships';
//                   this.router.navigateByUrl(returnUrl);
//               },
//               error: error => {
//                   this.error = error;
//                   this.loading = false;
//               }
//           });
//   }

//   goToRegister() {
//     this.router.navigate(['../register'], { relativeTo: this.route });
// }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  success?: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // show success message after registration
    if (this.route.snapshot.queryParams.registered) {
      this.success = 'Registration successful';
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alert on submit
    this.error = '';
    this.success = '';

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/starships';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }

  goToRegister() {
    this.router.navigate(['../register'], { relativeTo: this.route });
  }
}
