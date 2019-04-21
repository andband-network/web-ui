import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '../common/service/http/http.service';
import { AuthService } from '../common/service/auth/auth.service';
import { ObjectUtil } from '../common/util/object-util';
import { DomainInfo } from '../common/util/domain-info';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private profile: Profile;
  private profileImageLocation: string;
  private userIsLoggedIn: boolean;
  private profileOwner: boolean;
  private editMode: boolean;
  private originalProfile: Profile;

  constructor(private route: ActivatedRoute, private http: HttpService, public authService: AuthService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const profileId: string = params.get('profileId');
      this.loadProfileInfo(profileId);
    });
  }

  private loadProfileInfo(profileId: string): void {
    let path: string = '/profiles';
    if (profileId) {
      path += '/' + profileId
    }
    this.http.get(path)
      .subscribe(response => {
        // @ts-ignore
        this.profile = response;
        this.profileImageLocation = ProfileComponent.getImageLocation(this.profile.imageId);
      });

    if (!profileId) {
      this.profileOwner = true;
    }
  }

  private enterEditMode(): void {
    this.originalProfile = ObjectUtil.copy(this.profile);
    this.editMode = true;
  }

  private saveProfile(): void {
    if (!ObjectUtil.equals(this.profile, this.originalProfile)) {
      this.http.put('/profiles', this.profile).subscribe();
    }
    this.editMode = false;
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
          this.profileImageLocation = ProfileComponent.getImageLocation(this.profile.imageId);
        });
    }
  }

  private static getImageLocation(imageId): string {
    const imagesUri: string = DomainInfo.getImagesUri();
    return imagesUri + '/' + imageId + '?' + new Date().getTime();
  }

}
