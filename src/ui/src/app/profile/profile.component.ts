import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "../common/service/http/http.service";
import { AuthService } from "../common/service/auth/auth.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private profile: Profile;
  private profileImageLocation: string;
  private editProfile: boolean;

  constructor(private route: ActivatedRoute, private http: HttpService, public authService: AuthService) {
  }

  ngOnInit() {
    this.editProfile = false;
    this.route.paramMap.subscribe(params => {
      const profileId: string = params.get('profileId');
      this.loadProfile(profileId);
    });
  }

  private loadProfile(profileId: string) {
    let path: string = '/profiles';
    if (profileId) {
      path += '/' + profileId
    }
    this.http.get(path)
      .subscribe(response => {
        // @ts-ignore
        this.profile = response;
        this.profileImageLocation = ProfileComponent.getProfileImageLocation(this.profile.imageId);
      });
  }

  private saveProfile(): void {
    this.http.put('/profiles', this.profile).subscribe();
    this.editProfile = false;
  }

  private uploadImage(event): void {
    if (event.target.files.length > 0) {
      const path: string = '/profiles/' + this.profile.id + '/image';

      const imageFile = event.target.files[0];
      const params: FormData = new FormData();
      params.append('image', imageFile);
      params.append('profileId', this.profile.id);

      this.http.put(path, params)
        .subscribe(response => {
          this.profileImageLocation = ProfileComponent.getProfileImageLocation(this.profile.imageId);
        });
    }
  }

  static getProfileImageLocation(imageId: string): string {
    // @ts-ignore
    const imagesUri = document.querySelector("meta[name='imagesUri']").content;
    return imagesUri + '/' + imageId + '?' + new Date().getTime();
  }

}
