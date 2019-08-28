import { Applicant } from '../src'
import { ApplicantStatus } from '../src/Applicant'

describe('Applicant', () => {
  const applicant = new Applicant(
    'https://connpass.com/user/alice.test/',
    'Alice',
    '参加枠1',
    ApplicantStatus.accepted,
  )

  it('should know the URL', () => {
    expect(applicant.url).toBe('https://connpass.com/user/alice.test/')
  })

  it('should know the display name', () => {
    expect(applicant.displayName).toBe('Alice')
  })

  it('should know the participation type', () => {
    expect(applicant.participationType).toBe('参加枠1')
  })

  it('should know the nick name', () => {
    expect(applicant.nickName).toBe('alice.test')
  })
})
