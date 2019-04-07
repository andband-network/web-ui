import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "../common/service/http/http.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const profileId: string = params.get('profileId');
      this.loadProfile(profileId);
    });
  }

  private loadProfile(profileId: string) {
    let profileUri: string = '/profiles';
    if (profileId) {
      profileUri += '/' + profileId
    }

    this.http.get(profileUri)
      .subscribe(response => {
        console.log(response);
      });
  }

}
