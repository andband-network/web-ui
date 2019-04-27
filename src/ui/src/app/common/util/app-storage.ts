export class AppStorage {

  private static readonly type = {
    accessToken: 'access_token',
    profileId: 'profile_id'
  };

  static setAccessToken(accessToken: string): void {
    localStorage.setItem(this.type.accessToken, accessToken);
  }

  static getAccessToken(): string {
    return localStorage.getItem(this.type.accessToken);
  }

  static setProfileId(profileId: string): void {
    localStorage.setItem(this.type.profileId, profileId);
  }

  static getProfileId(): string {
    return localStorage.getItem(this.type.profileId);
  }

  static clear(): void {
    for (const property in this.type) {
      localStorage.removeItem(this.type[property]);
    }
  }

}
