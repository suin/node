import axios from 'axios'
import * as cheerio from 'cheerio'
import { ApplicantImpl } from './ApplicantImpl'
import { ApplicantRow } from './ApplicantRow'
import { ApplicantStatus } from './ApplicantStatus'

export class ParticipationPage {
  static async fetch(eventPageUrl: string): Promise<ParticipationPage> {
    const response = await axios.get(eventPageUrl + '/participation')
    return new ParticipationPage(response.data)
  }

  private readonly page: CheerioStatic

  private constructor(html: string) {
    this.page = cheerio.load(html)
  }

  get participants(): ReadonlyArray<ApplicantImpl> {
    return this.page('.participation_table_area tbody tr')
      .map((index, element) => {
        try {
          return new ApplicantRow(element).toApplicant(ApplicantStatus.accepted)
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

  get waitlist(): ReadonlyArray<ApplicantImpl> {
    return this.page('.waitlist_table_area tbody tr')
      .map((index, element) => {
        try {
          return new ApplicantRow(element).toApplicant(ApplicantStatus.waiting)
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

  get cancelled(): ReadonlyArray<ApplicantImpl> {
    return this.page('.cancelled_table_area tbody tr')
      .map((index, element) => {
        try {
          return new ApplicantRow(element).toApplicant(ApplicantStatus.canceled)
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
