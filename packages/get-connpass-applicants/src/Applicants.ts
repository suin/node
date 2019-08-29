import { Applicant } from './Applicant'

/**
 * Connpassの応募者
 */
export interface Applicants extends Iterable<Applicant> {
  /**
   * 応募者総数
   */
  readonly length: number

  /**
   * 参加者
   */
  readonly accepted: Applicants

  /**
   * 補欠
   */
  readonly waiting: Applicants

  /**
   * キャンセル
   */
  readonly canceled: Applicants

  /**
   * 配列に変換する
   */
  readonly toArray: Applicant[]

  get(index: number): Applicant | undefined
}
