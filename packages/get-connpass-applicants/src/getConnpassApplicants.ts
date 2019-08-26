import { Applicants } from './Applicants'
import { ApplicantsImpl } from './ApplicantsImpl'
import { EventParticipantPage } from './EventParticipantPage'

export const getConnpassApplicants = async (
  eventPageUrl: string,
): Promise<Applicants> => {
  const eventParticipantPage = await EventParticipantPage.fetch(eventPageUrl)
  return new ApplicantsImpl(
    eventParticipantPage.participants,
    eventParticipantPage.waitlist,
    eventParticipantPage.cancelled,
  )
}
