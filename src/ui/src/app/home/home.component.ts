import { Component, OnInit } from '@angular/core';
import { RegistrationService } from "./service/registration.service";
import { AuthService } from "../common/service/auth/auth.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private registrationService: RegistrationService) {
  }

  ngOnInit() {
  }

  login(credentials) {
    this.auth.login(credentials);
  }

  resister(userDetails) {
    this.registrationService.register(userDetails);
  }

}
