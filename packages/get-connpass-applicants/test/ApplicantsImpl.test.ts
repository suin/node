import { Applicants, ApplicantStatus } from '../src'
import { ApplicantImpl } from '../src/ApplicantImpl'
import { ApplicantsImpl } from '../src/ApplicantsImpl'

describe('Applicants', () => {
  const url = 'https://connpass.com/user/test.test/'
  it('should be iterable', () => {
    const applicants: Applicants = new ApplicantsImpl([
      new ApplicantImpl(url, 'name1', '参加枠1', ApplicantStatus.accepted),
      new ApplicantImpl(url, 'name2', '参加枠1', ApplicantStatus.waiting),
      new ApplicantImpl(url, 'name3', '参加枠1', ApplicantStatus.canceled),
    ])
    let i = 0
    const name = () => `name${++i}`
    for (const applicant of applicants) {
      expect(applicant.displayName).toBe(name())
    }
  })

  it('should be countable', () => {
    const applicants: Applicants = new ApplicantsImpl([
      new ApplicantImpl(url, 'name1', '参加枠1', ApplicantStatus.accepted),
      new ApplicantImpl(url, 'name2', '参加枠1', ApplicantStatus.waiting),
      new ApplicantImpl(url, 'name3', '参加枠1', ApplicantStatus.canceled),
    ])
    expect(applicants.length).toBe(3)
  })

  it('should be able to transform to Array', () => {
    const applicants: Applicants = new ApplicantsImpl([
      new ApplicantImpl(url, 'name1', '参加枠1', ApplicantStatus.accepted),
      new ApplicantImpl(url, 'name2', '参加枠1', ApplicantStatus.waiting),
      new ApplicantImpl(url, 'name3', '参加枠1', ApplicantStatus.canceled),
    ])
    expect(applicants.toArray.map(v => v.displayName)).toEqual([
      'name1',
      'name2',
      'name3',
    ])
  })

  describe('scope', () => {
    const applicants: Applicants = new ApplicantsImpl([
      new ApplicantImpl(url, 'name', '参加枠1', ApplicantStatus.accepted),
      new ApplicantImpl(url, 'name', '参加枠1', ApplicantStatus.waiting),
      new ApplicantImpl(url, 'name', '参加枠1', ApplicantStatus.canceled),
    ])

    describe('accepted', () => {
      const participants = applicants.accepted
      it('should return only the applicants whose status is accepted', () => {
        expect(participants.length).toBe(1)
        expect(participants.get(0)!.status).toBe(ApplicantStatus.accepted)
      })
    })

    describe('waiting', () => {
      const waitlist = applicants.waiting
      it('should return only the applicants whose status is waiting', () => {
        expect(waitlist.length).toBe(1)
        expect(waitlist.get(0)!.status).toBe(ApplicantStatus.waiting)
      })
    })

    describe('canceled', () => {
      const cancelled = applicants.canceled
      it('should return only the applicants whose status is canceled', () => {
        expect(cancelled.length).toBe(1)
        expect(cancelled.get(0)!.status).toBe(ApplicantStatus.canceled)
      })
    })
  })
})
