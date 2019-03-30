import { Component, OnInit } from '@angular/core';
import { RegistrationService } from "./service/registration.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private registrationService: RegistrationService) { }

  ngOnInit() {
  }

  resister(userDetails) {

    console.log(userDetails);

    // this.registrationService.register(userDetails)
    //   .subscribe(success => {
    //     if (success) {
    //       console.log('success');
    //       console.log("this.router.navigate(['/']);");
    //       // this.router.navigate(['/']);
    //     }
    //     else {
    //       console.log('failed');
    //       // this.loginFailed = true;
    //     }
    //   }, error => {
    //     console.log('error');
    //     console.log(error);
    //   });
  }

}
