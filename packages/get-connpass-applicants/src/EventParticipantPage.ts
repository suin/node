import axios from 'axios'
import * as cheerio from 'cheerio'
import { Applicant } from './Applicant'
import { ApplicantRow } from './ApplicantRow'

export class EventParticipantPage {
  static async fetch(eventPageUrl: string): Promise<EventParticipantPage> {
    const response = await axios.get(eventPageUrl + '/participation')
    return new EventParticipantPage(response.data)
  }

  private readonly page: CheerioStatic

  private constructor(html: string) {
    this.page = cheerio.load(html)
  }

  get participants(): ReadonlyArray<Applicant> {
    return this.page('.participation_table_area tbody tr')
      .map((index, element) => {
        try {
          return new ApplicantRow(element).toApplicant
        } catch (e) {
          throw new Error(
            `Failed to treat participant row element(idx:${index}) -- ${
              e instanceof Error ? e.message : ''
            }`,
          )
        }
      })
      .get()
  }

  get waitlist(): ReadonlyArray<Applicant> {
    return this.page('.waitlist_table_area tbody tr')
      .map((index, element) => {
        try {
          return new ApplicantRow(element).toApplicant
        } catch (e) {
          throw new Error(
            `Failed to treat waitlist row element(idx:${index}) -- ${
              e instanceof Error ? e.message : ''
            }`,
          )
        }
      })
      .get()
  }

  get cancelled(): ReadonlyArray<Applicant> {
    return this.page('.cancelled_table_area tbody tr')
      .map((index, element) => {
        try {
          return new ApplicantRow(element).toApplicant
        } catch (e) {
          throw new Error(
            `Failed to treat cancelled row element(idx:${index}) -- ${
              e instanceof Error ? e.message : ''
            }`,
          )
        }
      })
      .get()
  }
}
