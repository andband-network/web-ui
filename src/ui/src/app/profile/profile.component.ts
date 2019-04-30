import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { HttpService } from '../common/service/http/http.service';
import { AuthService } from '../common/service/auth/auth.service';
import { ObjectUtil } from '../common/util/object-util';
import { DomainInfo } from '../common/util/domain-info';
import { AppStorage } from '../common/util/app-storage';
import { ComposeMessageDialogComponent } from '../messages/compose-message/compose-message-dialog.component';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  profileImageLocation: string;
  connections: Array<Profile>;
  connectionStatus: string;
  imagesUri: string;
  userIsLoggedIn: boolean;
  isProfileOwner: boolean;
  editMode: boolean;
  private originalProfile: Profile;

  constructor(private route: ActivatedRoute, private http: HttpService, private authService: AuthService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userIsLoggedIn = this.authService.isLoggedIn();
    this.imagesUri = DomainInfo.getImagesUri();

    this.route.paramMap.subscribe(params => {
      let profileId: string = params.get('profileId');
      if (!profileId) {
        profileId = AppStorage.getProfileId();
      }

      this.isProfileOwner = profileId === AppStorage.getProfileId();

      this.loadProfile(profileId);
    });
  }

  private loadProfile(profileId: string): void {
    const path: string = '/profiles/' + profileId;
    this.http.get(path)
      .subscribe(response => {
        // @ts-ignore
        this.profile = response;
        this.updateProfileImage(this.profile.imageId);
      });

    if (this.userIsLoggedIn) {
      this.loadConnections(profileId);
      if (!this.isProfileOwner) {
        this.loadConnectionStatus(profileId);
      }
    }
  }

  private loadConnections(profileId: string): void {
    console.log('loadConnections');
    const path: string = '/profiles/' + profileId + '/connections';
    this.http.get(path)
      .subscribe(response => {
        // @ts-ignore
        this.connections = response;
        console.log(this.connections);
      });
  }

  private loadConnectionStatus(profileId: string) {
    const ownerProfileId: string = AppStorage.getProfileId();
    const path: string = '/profiles/' + ownerProfileId + '/connections/' + profileId + '/status';
    this.http.get(path)
      .subscribe(response => {
        // @ts-ignore
        this.connectionStatus = response;
      });
  }

  private addConnection(): void {
    this.addRemoveConnectionAction('post');
  }

  private removeConnection(): void {
    this.addRemoveConnectionAction('delete');
  }

  private addRemoveConnectionAction(action: 'post' | 'delete') {
    const loggedInUserProfileId: string = AppStorage.getProfileId();
    const connectionProfileId: string = this.profile.id;
    const path: string = '/profiles/' + loggedInUserProfileId + '/connections/' + connectionProfileId;
    this.http[action](path)
      .subscribe((response) => {
        // @ts-ignore
        this.connectionStatus = response;
        this.loadConnections(this.profile.id);
      });
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

      const params: FormData = new FormData();
      const imageFile = event.target.files[0];
      params.append('image', imageFile);
      params.append('profileId', this.profile.id);

      this.http.put(path, params)
        .subscribe(() => {
          this.updateProfileImage(this.profile.imageId);
        });
    }
  }

  private updateProfileImage(imageId: string): void {
    this.profileImageLocation = this.imagesUri + '/' + imageId + '?' + new Date().getTime();
  }

  private openSendMessageDialog(): void {
    const messageDialogConfig: any = {
      data: {
        senderProfileId: AppStorage.getProfileId(),
        receiverProfileId: this.profile.id
      }
    };
    this.dialog.open(ComposeMessageDialogComponent, messageDialogConfig);
  }

}
