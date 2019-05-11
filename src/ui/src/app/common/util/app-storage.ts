export class AppStorage {

  private static readonly type = {
    accessToken: 'access_token',
    profile: 'profile',
    profileId: 'profile_id'
  };

  static setAccessToken(accessToken: string): void {
    localStorage.setItem(this.type.accessToken, accessToken);
  }

  static getAccessToken(): string {
    return localStorage.getItem(this.type.accessToken);
  }

  static setProfile(profile: Profile): void {
    localStorage.setItem(this.type.profile, JSON.stringify(profile));
    localStorage.setItem(this.type.profileId, profile.id);
  }

  static getProfile(): Profile {
    const profileJson = localStorage.getItem(this.type.profile);
    return JSON.parse(profileJson);
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
