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
    readonly status: ApplicantStatus,
  ) {
    const matches = /^https:\/\/connpass\.com\/user\/([^\/]+)\/$/.exec(url)
    if (matches === null) {
      throw new Error(`Invalid URL is given: ${url}`)
    }
    this.nickName = matches[1]
  }
}

/**
 * 応募者のステータス
 */
export enum ApplicantStatus {
  /**
   * 参加
   */
  accepted = 'accepted',
  /**
   * 補欠
   */
  waiting = 'waiting',
  /**
   * キャンセル
   */
  cancelled = 'cancelled',
}
