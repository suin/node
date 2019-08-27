import { Applicant } from '../src'
import { ApplicantsImpl } from '../src/ApplicantsImpl'

describe('Applicants', () => {
  describe('participantsByParticipationType', () => {
    test('one participation type', () => {
      const participants = [
        new Applicant('url', 'name1', '参加枠1'),
        new Applicant('url', 'name2', '参加枠1'),
      ]
      const applicants = new ApplicantsImpl(participants, [], [])
      const types = applicants.participantsByParticipationType
      expect(Array.from(types.keys())).toEqual(['参加枠1'])
      expect(types.get('参加枠1')).toMatchObject([
        new Applicant('url', 'name1', '参加枠1'),
        new Applicant('url', 'name2', '参加枠1'),
      ])
    })

    test('two participation types', () => {
      const participants = [
        new Applicant('url', 'name1', '参加枠1'),
        new Applicant('url', 'name2', '参加枠1'),
        new Applicant('url', 'name3', '参加枠2'),
        new Applicant('url', 'name4', '参加枠2'),
      ]

      const applicants = new ApplicantsImpl(participants, [], [])

      const types = applicants.participantsByParticipationType
      expect(Array.from(types.keys())).toEqual(['参加枠1', '参加枠2'])
      expect(types.get('参加枠1')).toMatchObject([
        new Applicant('url', 'name1', '参加枠1'),
        new Applicant('url', 'name2', '参加枠1'),
      ])
      expect(types.get('参加枠2')).toMatchObject([
        new Applicant('url', 'name3', '参加枠2'),
        new Applicant('url', 'name4', '参加枠2'),
      ])
      expect(types.get('存在しない枠')).toBe(undefined)
    })
  })
})
