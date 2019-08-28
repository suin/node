/**
 * 応募者
 */
export class Applicant {
  readonly nickName: string

  // noinspection JSUnusedGlobalSymbols
  constructor(
    readonly url: string,
    readonly displayName: string,
    readonly participationType: string,
  ) {
    const matches = /^https:\/\/connpass\.com\/user\/([^\/]+)\/$/.exec(url)
    if (matches === null) {
      throw new Error(`Invalid URL is given: ${url}`)
    }
    this.nickName = matches[1]
  }
}
