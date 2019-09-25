export interface ParticipationHistory {
  /**
   * Connpassのユーザ名
   */
  readonly connpassUsername: string

  /**
   * 呼び名
   */
  readonly nickname: string

  /**
   * 前回参加日
   */
  readonly lastParticipationDate: string

  /**
   * 前回の参加種別
   */
  readonly lastParticipationType: string

  /**
   * 参加回数
   */
  readonly participationCount: number

  /**
   * TS歴
   */
  readonly experience: string

  /**
   * 自己紹介
   */
  readonly selfIntroduction: string
}
