export class DomainInfo {

  static getApiUri(): string {
    // @ts-ignore
    return document.querySelector("meta[name='apiUri']").content;
  }

  static getApiDomain(): string {
    const protocolRegex: RegExp = /(http|https):\/\//;
    return this.getApiUri().replace(protocolRegex, '')
  }

  static getImagesUri(): string {
    // @ts-ignore
    return document.querySelector("meta[name='imagesUri']").content;
  }

}
