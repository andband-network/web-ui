import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';
import { HttpService } from '../common/service/http/http.service';
import { DialogService } from '../common/component/dialog/dialog.service';
import { DomainInfo } from '../common/util/domain-info';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  registrationForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  recaptchaRendered: boolean;
  digestInterval;

  constructor(private route: ActivatedRoute,
              private spinner: ProgressSpinnerService,
              private http: HttpService,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.createRecaptchaElement();
    });
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  register(formValues) {
    this.spinner.show();
    clearInterval(this.digestInterval);
    const path: string = '/register/signup';
    const registrationRequest = this.createRegistrationRequest(formValues);
    this.http.post(path, registrationRequest)
      .subscribe(() => {
        this.spinner.hide();
        this.showRegistrationEmailSentDialog();
      }, (error) => {
        this.spinner.hide();
        this.dialogService.showSystemErrorDialog();
      });
  }

  validRecaptcha(): boolean {
    let validRecaptcha: boolean = false;
    if (this.recaptchaRendered) {
      // @ts-ignore
      validRecaptcha = grecaptcha.getResponse().length > 0;
    }
    return validRecaptcha;
  }

  getEmailErrorMessage(formControl) {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  private createRegistrationRequest(userDetails): any {
    // @ts-ignore
    const captchaToken = grecaptcha.getResponse();
    return {
      username: userDetails.username,
      email: userDetails.email,
      password: userDetails.password,
      captchaToken: captchaToken
    }
  }

  private showRegistrationEmailSentDialog() {
    const messageText: string = 'We have sent you an email to confirm your registration';
    this.dialogService.showModelDialog(messageText, 'OK');
  }

  private createRecaptchaElement() {
    const recaptchaKey: string = DomainInfo.getRecaptchaKey();
    const recaptcha = document.getElementById('g-recaptcha');
    recaptcha.innerHTML = '<div class="g-recaptcha" style="display: inline-block" data-sitekey="' + recaptchaKey + '"></div>';

    const recaptchaScript = document.createElement('script');
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
    recaptchaScript.type = 'text/javascript';
    recaptchaScript.async = true;
    recaptchaScript.defer = true;

    setTimeout(() => {
      const googleRecaptcha = document.getElementById('googleRecaptcha');
      googleRecaptcha.innerHTML = '';
      googleRecaptcha.append(recaptchaScript);
      this.recaptchaRendered = true;
    }, 10);
  }

  startDigest() {
    if (!this.digestInterval) {
      this.digestInterval = setInterval(() => {
        if (this.validRecaptcha()) {
          clearInterval(this.digestInterval);
        }
      }, 200);
    }
  }

  ngOnDestroy(): void {
    if (!this.digestInterval) {
      clearInterval(this.digestInterval);
    }
  }

}
