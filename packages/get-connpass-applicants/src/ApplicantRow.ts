import cheerio from 'cheerio'
import { Applicant } from './Applicant'
import { ApplicantStatus } from './ApplicantStatus'

export class ApplicantRow {
  private readonly row: Cheerio

  constructor(applicantRowElement: CheerioElement) {
    this.row = cheerio(applicantRowElement)
  }

  toApplicant(status: ApplicantStatus): Applicant {
    return new Applicant(this.url, this.name, this.participationType, status)
  }

  private get name(): string {
    const nameElements = this.row.find('.display_name')
    if (nameElements.length !== 1) {
      throw new Error(
        `Failed to get the name of the applicant. The length of the elements is ${nameElements.length}`,
      )
    }
    return nameElements.text().trim()
  }

  private get url(): string {
    const urlElements = this.row.find('.display_name a')
    if (urlElements.length !== 1) {
      throw new Error(
        `Failed to get the URL of the applicant. The length of the elements is ${urlElements.length}`,
      )
    }
    const hrefAttributeOfUrlElement = urlElements.attr('href')
    if (hrefAttributeOfUrlElement === undefined) {
      throw new Error(
        `Failed to get the URL of the applicant. The element has no href attribute: ${urlElements}`,
      )
    }
    return hrefAttributeOfUrlElement.trim()
  }

  private get participationType(): string {
    const participationTypeElements = this.row.find('.label_ptype_name')
    if (participationTypeElements.length !== 1) {
      throw new Error(
        `Failed to get the participation type of the applicant. The length of the elements is ${participationTypeElements.length}`,
      )
    }
    return participationTypeElements.text().trim()
  }
}
