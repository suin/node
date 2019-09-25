import { ParticipationHistory } from '.'

type ConnpassUsername = string

export interface ParticipationHistoryStore {
  find(
    connpassUsernames: readonly ConnpassUsername[],
  ): Promise<ReadonlyMap<ConnpassUsername, ParticipationHistory>>
}
