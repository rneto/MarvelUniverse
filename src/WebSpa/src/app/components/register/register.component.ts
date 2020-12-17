import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, SnackBarService } from 'src/app/core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  public : boolean;
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
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordsValidator});

    if (this.authService.checkAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        this.loading = true;

        const name = this.form.get('name').value;
        const surname = this.form.get('surname').value;
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        const confirmPassword = this.form.get('confirmPassword').value;
        await this.authService.register(name, surname, email, password)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
                  this.loading = false;
              },
              error => {
                this.snackBarService.open('Invalid registration.');
                this.loading = false;
              });

      } catch (err) {
        this.snackBarService.open('Invalid registration.');
        this.loading = false;
      }
    }
  }

  passwordsValidator(form: FormGroup) {
    let password = form.controls.password.value;
    let confirmPassword = form.controls.confirmPassword.value;

    if (password !== confirmPassword) {
      return form.controls.confirmPassword.setErrors({ notMatch: true });
    } else {
      return null;
    }
  }

  getNameErrorMessage() {
    if (this.form.controls.name.hasError('required')) {
      return 'Name is required';
    }
  }

  getSurnameErrorMessage() {
    if (this.form.controls.surname.hasError('required')) {
      return 'Email is required';
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

  getConfirmPasswordErrorMessage() {
    if (this.form.controls.confirmPassword.hasError('required')) {
      return 'Confirm password is required';
    }

    return this.form.controls.confirmPassword.hasError('notMatch') ? 'Passwords do not match' : '';
  }

}
