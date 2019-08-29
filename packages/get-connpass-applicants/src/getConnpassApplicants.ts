import { Applicants } from './Applicants'
import { ApplicantsImpl } from './ApplicantsImpl'
import { ParticipationPage } from './ParticipationPage'

/**
 * Connpassイベントの応募者を返す
 * @param eventPageUrl ConnpassイベントのURL
 */
export const getConnpassApplicants = async (
  eventPageUrl: string,
): Promise<Applicants> => {
  const participationPage = await ParticipationPage.fetch(eventPageUrl)
  return new ApplicantsImpl([
    ...participationPage.participants,
    ...participationPage.waitlist,
    ...participationPage.cancelled,
  ])
}
