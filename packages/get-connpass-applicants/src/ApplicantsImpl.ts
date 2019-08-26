import { Applicant } from './Applicant'
import { Applicants } from './Applicants'

export class ApplicantsImpl implements Applicants {
  // noinspection JSUnusedGlobalSymbols
  constructor(
    readonly participants: ReadonlyArray<Applicant>,
    readonly waitlist: ReadonlyArray<Applicant>,
    readonly cancelled: ReadonlyArray<Applicant>,
  ) {}

  get participantsByParticipationType(): ReadonlyMap<
    string,
    ReadonlyArray<Applicant>
  > {
    const types = new Map<string, Applicant[]>()

    this.participants.forEach(participant => {
      const list = types.get(participant.participationType)
      if (list !== undefined) {
        list.push(participant)
      } else {
        types.set(participant.participationType, [participant])
      }
    })

    return types
  }
}
