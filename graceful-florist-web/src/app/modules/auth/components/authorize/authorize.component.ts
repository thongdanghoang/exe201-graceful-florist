import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SubscriptionAwareComponent} from '../../../core/subscription-aware.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  username: string = 'username';
  password: string = 'password';
  fullName: string = 'fullName';
  confirmPassword: string = 'confirmPassword';
  otp: string = 'otp';

  loginForm: FormGroup;
  registerForm: FormGroup;
  forgotPasswordForm: FormGroup;
  currentTemplate: TemplateRef<any>;

  constructor(private readonly fb: FormBuilder) {
    // NOTE: Avoid complex logic or operations that depend on Angular bindings or lifecycle hooks
    super();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
    // TODO : Implement onInit
    this.currentTemplate = this.loginTemplate;
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

  protected onLogin(): void {
    // Handle login logic
    if (this.loginForm.valid) {
      // eslint-disable-next-line no-console
      console.debug('Logging in with', this.loginForm.value);
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
