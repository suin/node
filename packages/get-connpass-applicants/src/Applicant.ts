import { ApplicantStatus } from './ApplicantStatus'

/**
 * 応募者
 */
export interface Applicant {
  /**
   * ConnpassプロフィールのURL
   */
  readonly url: string

  /**
   * Connpass個人設定のユーザー名
   */
  readonly nickName: string

  /**
   * Connpass個人設定の表示名
   */
  readonly displayName: string

  /**
   * 参加枠
   */
  readonly participationType: string

  /**
   * 応募ステータス
   */
  readonly status: ApplicantStatus
}
