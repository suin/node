import { Command, flags } from '@oclif/command'
import {
  Applicant,
  Applicants,
  getConnpassApplicants,
} from '@suin/get-connpass-applicants'
import csv from 'fast-csv'

class GetConnpassApplicants extends Command {
  static description =
    'A simple CLI command that gets the applicants from a given Connpass event URL.'

  static example = [
    'Basic usage:',
    '$ connpass-applicants https://connpass.com/event/144296/',
    '',
    'Output as CSV format:',
    '$ connpass-applicants https://connpass.com/event/144296/ --format=json --pretty',
    '',
    'Print only accepted applicants as CSV (working with q command):',
    `$ connpass-applicants https://connpass.com/event/144296/ --format=csv | q \\
  --skip-header \\
  --delimiter=',' \\
  'SELECT displayName, participationType FROM - WHERE status = "accepted"'`,
    '',
    'NOTE: the value of the status is one of "accepted", "waiting" and "canceled"',
    '',
    'Print attendants like Markdown table (working with q command);',
    `$ connpass-applicants https://connpass.com/event/144296/ --format=csv | q \\
  --skip-header \\
  --delimiter=',' \\
  --output-header \\
  --output-delimiter=' | ' \\
  --beautify \\
  'SELECT nickName, displayName, url FROM - WHERE status = "accepted" AND participationType = "現地参加"'`,
    '',
    'Print only accepted applicants as JSON (working with jq command):',
    `$ connpass-applicants https://connpass.com/event/144296/ | jq \\
  '[ .[] | select(.status == "accepted") | { name: .displayName, type: .participationType } ]'`,
    '',
    'NOTE: the value of the status is one of "accepted", "waiting" and "canceled"',
  ]

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    format: flags.string({
      description: 'output format',
      default: 'json',
      options: ['json', 'csv'],
    }),
    pretty: flags.boolean({
      description: 'enable pretty print (works only json format)',
    }),
  }

  static args = [
    {
      name: 'url',
      required: true,
      description:
        'Connpass event URL (eg. https://connpass.com/event/144296/)',
    },
  ]

  async run() {
    // tslint:disable-next-line:no-shadowed-variable
    const { args, flags } = this.parse(GetConnpassApplicants)
    const applicants = await getConnpassApplicants(args.url)

    let output: string
    switch (flags.format) {
      case 'json':
        output = jsonFormatter(applicants, { pretty: flags.pretty })
        break
      case 'csv':
        output = await csvFormatter(applicants)
        break
      default:
        throw new Error(`Unexpected format: ${flags.format}`)
    }
    process.stdout.write(output)
  }
}

const jsonFormatter = (
  applicants: Applicants,
  { pretty }: { pretty: boolean },
) =>
  pretty
    ? JSON.stringify(applicants.toArray, null, '  ')
    : JSON.stringify(applicants.toArray)

const csvFormatter = async (applicants: Applicants): Promise<string> =>
  await csv.writeToString([
    ['nickName', 'displayName', 'participationType', 'status', 'url'],
    ...applicants.toArray.map((a: Applicant) => [
      a.nickName,
      a.displayName,
      a.participationType,
      a.status,
      a.url,
    ]),
  ])

export = GetConnpassApplicants
