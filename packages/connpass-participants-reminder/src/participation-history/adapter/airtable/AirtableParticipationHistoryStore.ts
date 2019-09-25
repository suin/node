import Airtable from 'airtable'
import { ParticipationHistory, ParticipationHistoryStore } from '../..'

const recordDefinition = {
  connpassUsername: '' as string,
  nickname: '' as string,
  experience: '' as string,
  participationType: '' as string,
  participationDate: '' as string,
  selfIntroduction: '' as string,
} as const

const recordFieldNames = Object.keys(recordDefinition)

type Record = typeof recordDefinition

const buildFormula = (connpassUsernames: readonly string[]): string =>
  `OR(${connpassUsernames
    .map(name => `{connpassUsername} = '${name}'`)
    .join(',')})`

const convertRecordsToParticipationHistories = (
  records: readonly Record[],
): ReadonlyMap<string, ParticipationHistory> => {
  const participationCounts = new Map<string, number>()
  const participationHistories = new Map<string, ParticipationHistory>()

  records.forEach(
    ({
      connpassUsername,
      nickname,
      participationDate,
      participationType,
      experience,
      selfIntroduction,
    }) => {
      // increment participation count
      participationCounts.set(
        connpassUsername,
        (participationCounts.get(connpassUsername) || 0) + 1,
      )

      participationHistories.set(connpassUsername, {
        connpassUsername,
        nickname,
        lastParticipationDate: participationDate,
        lastParticipationType: participationType,
        participationCount: participationCounts.get(connpassUsername)!,
        experience,
        selfIntroduction,
      })
    },
  )

  return participationHistories
}

export interface AirtableParticipationHistoryStoreOptions {
  readonly apiKey: string
  readonly appId: string
  readonly tableName: string
  readonly viewName: string
}

export class AirtableParticipationHistoryStore
  implements ParticipationHistoryStore {
  private readonly table: Airtable.Table<Record>
  private readonly viewName: string

  constructor({
    apiKey,
    appId,
    tableName,
    viewName,
  }: AirtableParticipationHistoryStoreOptions) {
    const base = new Airtable({ apiKey }).base(appId)
    // @ts-ignore
    this.table = base(tableName)
    this.viewName = viewName
  }

  async find(
    connpassUsernames: readonly string[],
  ): Promise<ReadonlyMap<string, ParticipationHistory>> {
    const rawRecords = await this.table
      .select({
        view: this.viewName,
        fields: recordFieldNames,
        sort: [{ field: 'participationDate', direction: 'asc' }],
        filterByFormula: buildFormula(connpassUsernames),
      })
      .all()

    const records: readonly Record[] = rawRecords.map(({ fields }) => {
      const {
        connpassUsername,
        nickname = '',
        experience = '',
        participationType,
        participationDate,
        selfIntroduction = '',
      } = fields
      return {
        connpassUsername,
        nickname,
        experience,
        participationType,
        participationDate,
        selfIntroduction,
      }
    })

    return convertRecordsToParticipationHistories(records)
  }
}
