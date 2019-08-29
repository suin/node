import { Applicant } from './Applicant'
import { Applicants } from './Applicants'
import { ApplicantStatus } from './ApplicantStatus'

export class ApplicantsImpl implements Applicants {
  constructor(readonly applicants: readonly Applicant[]) {}

  get length(): number {
    return this.applicants.length
  }

  get accepted(): Applicants {
    return this.filter(
      applicant => applicant.status === ApplicantStatus.accepted,
    )
  }

  get waiting(): Applicants {
    return this.filter(
      applicant => applicant.status === ApplicantStatus.waiting,
    )
  }

  get canceled(): Applicants {
    return this.filter(
      applicant => applicant.status === ApplicantStatus.canceled,
    )
  }

  get toArray(): Applicant[] {
    return [...this.applicants]
  }

  [Symbol.iterator](): Iterator<Applicant> {
    return this.applicants[Symbol.iterator]()
  }

  get(index: number): Applicant | undefined {
    return this.applicants[index]
  }

  private filter(condition: (applicant: Applicant) => boolean): Applicants {
    return new ApplicantsImpl(this.applicants.filter(condition))
  }
}
