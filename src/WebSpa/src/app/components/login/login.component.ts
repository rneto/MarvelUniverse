import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, SnackBarService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    if (this.authService.checkAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        this.loading = true;

        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        await this.authService.login(email, password)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
                  this.loading = false;
              },
              error => {
                this.snackBarService.open('Invalid login.');
                this.loading = false;
              });

      } catch (err) {
        this.snackBarService.open('Invalid login.');
        this.loading = false;
      }
    }
  }

  getEmailErrorMessage() {
    if (this.form.controls.email.hasError('required')) {
      return 'Email is required';
    }

    return this.form.controls.email.hasError('email') ? 'Email is not valid' : '';
  }

  getPasswordErrorMessage() {
    if (this.form.controls.password.hasError('required')) {
      return 'Password is required';
    }
  }

}
