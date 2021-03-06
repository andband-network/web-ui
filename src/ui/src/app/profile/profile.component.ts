import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { HttpService } from '../common/service/http/http.service';
import { AuthService } from '../common/service/auth/auth.service';
import { ObjectUtil } from '../common/util/object-util';
import { DomainInfo } from '../common/util/domain-info';
import { AppStorage } from '../common/util/app-storage';
import { ComposeMessageDialogComponent } from '../messages/compose-message/compose-message-dialog.component';
import { ProgressSpinnerService } from '../common/service/progress-spinner/progress-spinner.service';
import { ConfirmationModalDialogComponent } from '../common/component/dialog/confirmation-model/confirmation-modal-dialog.component';
import { DialogService } from '../common/component/dialog/dialog.service';

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
  private map;
  private mapMarker;

  constructor(private route: ActivatedRoute,
              private spinner: ProgressSpinnerService,
              private dialog: MatDialog,
              private http: HttpService,
              private authService: AuthService,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.userIsLoggedIn = this.authService.isLoggedIn();
    this.imagesUri = DomainInfo.getImagesUri();

    this.route.paramMap.subscribe(params => {
      let profileId: string = params.get('profileId');
      if (!profileId) {
        profileId = AppStorage.getProfileId();
      }

      if (this.userIsLoggedIn) {
        this.isProfileOwner = profileId === AppStorage.getProfileId();
      }

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
        if (this.userIsLoggedIn && (this.isProfileOwner || this.profile.showLocation)) {
          this.loadGoogleMaps(this.profile);
        }
      });

    if (this.userIsLoggedIn) {
      this.loadConnections(profileId);
      if (!this.isProfileOwner) {
        this.loadConnectionStatus(profileId);
      }
    }
  }

  private loadConnections(profileId: string): void {
    const path: string = '/profiles/' + profileId + '/connections';
    this.http.get(path)
      .subscribe(response => {
        // @ts-ignore
        this.connections = response;
      });
  }

  private loadConnectionStatus(profileId: string): void {
    const ownerProfileId: string = AppStorage.getProfileId();
    const path: string = '/profiles/' + ownerProfileId + '/connections/' + profileId + '/status';
    this.http.get(path)
      .subscribe(response => {
        // @ts-ignore
        this.connectionStatus = response;
      });
  }

  addConnection(): void {
    this.addRemoveConnectionAction('post');
  }

  removeConnection(): void {
    this.addRemoveConnectionAction('delete');
  }

  private addRemoveConnectionAction(action: 'post' | 'delete'): void {
    this.spinner.show();
    const loggedInUserProfileId: string = AppStorage.getProfileId();
    const connectionProfileId: string = this.profile.id;
    const path: string = '/profiles/' + loggedInUserProfileId + '/connections/' + connectionProfileId;
    this.http[action](path)
      .subscribe((response) => {
        // @ts-ignore
        this.connectionStatus = response;
        this.loadConnections(this.profile.id);
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
        this.dialogService.showSystemErrorDialog();
      });
  }

  openSendMessageDialog(): void {
    const messageDialogConfig: any = {
      data: {
        senderProfileId: AppStorage.getProfileId(),
        receiverProfileId: this.profile.id,
        receiverProfileName: this.profile.name,
      }
    };
    this.dialog.open(ComposeMessageDialogComponent, messageDialogConfig);
  }

  enterEditMode(): void {
    this.originalProfile = ObjectUtil.copy(this.profile);
    this.editMode = true;
  }

  saveProfile(): void {
    if (!ObjectUtil.equals(this.profile, this.originalProfile)) {
      this.http.put('/profiles', this.profile).subscribe();
      AppStorage.setProfile(this.profile);
    }
    this.editMode = false;
  }

  uploadImage(event): void {
    if (event.target.files.length > 0) {
      const path: string = '/profiles/' + this.profile.id + '/image';
      const params: FormData = new FormData();
      const imageFile = event.target.files[0];

      if (imageFile.size < 1000000) {
        this.spinner.show();

        params.append('image', imageFile);
        params.append('profileId', this.profile.id);

        this.http.put(path, params)
          .subscribe(() => {
            this.updateProfileImage(this.profile.imageId);
            this.spinner.hide();
          });
      } else {
        this.showImageSizeToLargeDialog();
      }
    }
  }

  private updateProfileImage(imageId: string): void {
    this.profileImageLocation = this.imagesUri + '/' + imageId + '?' + new Date().getTime();
  }

  private showImageSizeToLargeDialog(): void {
    const dialogConfig: any = {
      data: {
        messageText: 'Image files must be less than 1MB in size',
        buttonText: 'OK'
      }
    };
    this.dialog.open(ConfirmationModalDialogComponent, dialogConfig);
  }

  private loadGoogleMaps(profile: Profile): void {
    const location = ProfileComponent.getMapLocation(profile);

    // @ts-ignore
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: location,
      styles: [
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill'
        }
      ]
    });
    if (this.isProfileOwner) {
      // @ts-ignore
      google.maps.event.addListener(this.map, 'click', this.clickMap.bind(this));
    }

    if (ProfileComponent.hasMapLocationSet(profile)) {
      this.addMarker(location, this.map);
    }
  }

  private static getMapLocation(profile: Profile) {
    if (ProfileComponent.hasMapLocationSet(profile)) {
      return profile.location;
    } else {
      // dublin
      return {lat: 53.3223925, lng: -6.2676825};
    }
  }

  private static hasMapLocationSet(profile: Profile): boolean {
    const location = profile.location;
    return location.lat != 0 && location.lng != 0;
  }

  private clickMap(event): void {
    if (this.editMode) {
      if (this.mapMarker) {
        this.mapMarker.setMap(null);
      }
      const location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      this.addMarker(location, this.map);
    }
  }

  private addMarker(location, map): void {
    // @ts-ignore
    this.mapMarker = new google.maps.Marker({
      position: location,
      map: map
    });
    this.profile.location = location;
  }

}
