import { Applicants } from './Applicants'
import { ApplicantsImpl } from './ApplicantsImpl'
import { ParticipationPage } from './ParticipationPage'

export const getConnpassApplicants = async (
  eventPageUrl: string,
): Promise<Applicants> => {
  const participationPage = await ParticipationPage.fetch(eventPageUrl)
  return new ApplicantsImpl(
    participationPage.participants,
    participationPage.waitlist,
    participationPage.cancelled,
  )
}
