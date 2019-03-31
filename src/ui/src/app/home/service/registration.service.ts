import { Injectable } from '@angular/core';
import { HttpService } from "../../common/service/http/http.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpService) {
  }

  register(userDetails) {
    const uri: string = '/register/signup';
    const requestBody = {
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password
    };

    return this.http.post(uri, requestBody)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log('error');
        console.log(error);
      });
  }

}
