import { Applicant } from './Applicant'

/**
 * Connpassの応募者
 */
export interface Applicants {
  /**
   * 参加者
   */
  readonly participants: ReadonlyArray<Applicant>

  /**
   * 参加枠ごとの参加者
   */
  readonly participantsByParticipationType: ReadonlyMap<
    string,
    ReadonlyArray<Applicant>
  >

  /**
   * 補欠
   */
  readonly waitlist: ReadonlyArray<Applicant>

  /**
   * キャンセル
   */
  readonly cancelled: ReadonlyArray<Applicant>
}
