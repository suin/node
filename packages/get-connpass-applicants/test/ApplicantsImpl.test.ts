import { Applicant, ApplicantStatus } from '../src'
import { ApplicantsImpl } from '../src/ApplicantsImpl'

describe('Applicants', () => {
  const url = 'https://connpass.com/user/test.test/'
  describe('participantsByParticipationType', () => {
    test('one participation type', () => {
      const participants = [
        new Applicant(url, 'name1', '参加枠1', ApplicantStatus.accepted),
        new Applicant(url, 'name2', '参加枠1', ApplicantStatus.accepted),
      ]
      const applicants = new ApplicantsImpl(participants, [], [])
      const types = applicants.participantsByParticipationType
      expect(Array.from(types.keys())).toEqual(['参加枠1'])
      expect(types.get('参加枠1')).toMatchObject([
        new Applicant(url, 'name1', '参加枠1', ApplicantStatus.accepted),
        new Applicant(url, 'name2', '参加枠1', ApplicantStatus.accepted),
      ])
    })

    test('two participation types', () => {
      const participants = [
        new Applicant(url, 'name1', '参加枠1', ApplicantStatus.accepted),
        new Applicant(url, 'name2', '参加枠1', ApplicantStatus.accepted),
        new Applicant(url, 'name3', '参加枠2', ApplicantStatus.accepted),
        new Applicant(url, 'name4', '参加枠2', ApplicantStatus.accepted),
      ]

      const applicants = new ApplicantsImpl(participants, [], [])

      const types = applicants.participantsByParticipationType
      expect(Array.from(types.keys())).toEqual(['参加枠1', '参加枠2'])
      expect(types.get('参加枠1')).toMatchObject([
        new Applicant(url, 'name1', '参加枠1', ApplicantStatus.accepted),
        new Applicant(url, 'name2', '参加枠1', ApplicantStatus.accepted),
      ])
      expect(types.get('参加枠2')).toMatchObject([
        new Applicant(url, 'name3', '参加枠2', ApplicantStatus.accepted),
        new Applicant(url, 'name4', '参加枠2', ApplicantStatus.accepted),
      ])
      expect(types.get('存在しない枠')).toBe(undefined)
    })
  })
})
