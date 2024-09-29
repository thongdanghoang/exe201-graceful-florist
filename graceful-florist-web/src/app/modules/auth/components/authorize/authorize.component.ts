import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppRoutingConstants} from '../../../../app-routing-constants';
import {Router} from '@angular/router';
import {UserService} from '../../../../mock/mock-user.service';

@Component({
  selector: 'graceful-florist-authorize',
  templateUrl: './authorize.component.html',
  styleUrl: './authorize.component.css'
})
export class AuthorizeComponent
  extends SubscriptionAwareComponent
  implements OnInit
{
  @ViewChild('loginTemplate', {static: true}) loginTemplate!: TemplateRef<any>;
  @ViewChild('signupTemplate', {static: true})
  signupTemplate!: TemplateRef<any>;
  @ViewChild('forgotPasswordTemplate', {static: true})
  forgotPasswordTemplate!: TemplateRef<any>;

  showPassword = false;
  showConfirmPassword = false;
  otpSent = false;

  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;
  currentTemplate: TemplateRef<any>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly userService: UserService
  ) {
    // NOTE: Avoid complex logic or operations that depend on Angular bindings or lifecycle hooks
    super();
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

    this.forgotPasswordForm = this.fb.group({
      username: ['', Validators.required],
      otp: ['', Validators.required]
    });
    this.currentTemplate = this.loginTemplate;
  }

  ngOnInit(): void {
    this.currentTemplate = this.loginTemplate;
    if (this.userService.authenticated()) {
      if (this.userService.getUser()?.role === 'admin') {
        void this.router.navigate([AppRoutingConstants.ADMIN_PATH]);
      } else {
        void this.router.navigate([AppRoutingConstants.HOME_PATH]);
      }
    }
  }

  protected onLogin(): void {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      const role = username.includes('admin') ? 'admin' : 'user';
      const mockUser = {username, password, role};
      this.userService.setUser(mockUser);
      if (this.userService.getUser()?.role === 'admin') {
        void this.router.navigate([AppRoutingConstants.ADMIN_PATH]);
      } else {
        void this.router.navigate([AppRoutingConstants.HOME_PATH]);
      }
    }
  }

  protected switchTemplate(template: string): void {
    switch (template) {
      case 'login':
        this.currentTemplate = this.loginTemplate;
        break;
      case 'signup':
        this.currentTemplate = this.signupTemplate;
        break;
      case 'forgotPassword':
        this.currentTemplate = this.forgotPasswordTemplate;
        break;
      default:
        this.currentTemplate = this.loginTemplate;
    }
  }

  protected onSignUp(): void {
    // Handle sign-up logic
    if (this.registerForm.valid) {
      // eslint-disable-next-line no-console
      console.debug('Signing up with', this.registerForm.value);
    }
  }

  protected onForgotPassword(): void {
    // Handle forgot password logic
    if (this.forgotPasswordForm.valid) {
      // eslint-disable-next-line no-console
      console.debug('Resetting password for', this.forgotPasswordForm.value);
    }
  }

  protected toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  protected toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  protected getShowPasswordIcon(): string {
    return this.showPassword ? 'visibility' : 'visibility_off';
  }

  protected getShowConfirmPasswordIcon(): string {
    return this.showConfirmPassword ? 'visibility' : 'visibility_off';
  }
}
