/**
 * 応募者
 */
export class Applicant {
  readonly nickName: string
  readonly displayName: string

  // noinspection JSUnusedGlobalSymbols
  constructor(
    readonly url: string,
    name: string,
    readonly participationType: string,
  ) {
    const matches = /^https:\/\/connpass\.com\/user\/([^\/]+)\/$/.exec(url)
    if (matches === null) {
      throw new Error(`Invalid URL is given: ${url}`)
    }
    this.nickName = matches[1]
    this.displayName = name
  }

  get name(): string {
    // tslint:disable-next-line:no-console
    console.warn(
      'Applicant.prototype.name is deprecated. Use Applicant.prototype.displayName instead.',
    )
    return this.displayName
  }
}
