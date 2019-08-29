# `@suin/get-connpass-applicants-cli`

A simple CLI command that gets the applicants from a given Connpass event URL.

## Usage

```
connpass-applicants https://connpass.com/event/123/
```

### Details

```bash
A simple CLI command that gets the applicants from a given Connpass event URL.

USAGE
  $ connpass-applicants URL

ARGUMENTS
  URL  Connpass event URL (eg. https://connpass.com/event/144296/)

OPTIONS
  -h, --help         show CLI help
  -v, --version      show CLI version
  --format=json|csv  [default: json] output format
  --pretty           enable pretty print (works only json format)

EXAMPLES
  Basic usage:
  $ connpass-applicants https://connpass.com/event/144296/

  Output as CSV format:
  $ connpass-applicants https://connpass.com/event/144296/ --format=json --pretty

  Print only accepted applicants as CSV (working with q command):
  $ connpass-applicants https://connpass.com/event/144296/ --format=csv | q \
     --skip-header \
     --delimiter=',' \
     'SELECT displayName, participationType FROM - WHERE status = "accepted"'

  NOTE: the value of the status is one of "accepted", "waiting" and "canceled"

  Print attendants like Markdown table (working with q command);
  $ connpass-applicants https://connpass.com/event/144296/ --format=csv | q \
     --skip-header \
     --delimiter=',' \
     --output-header \
     --output-delimiter=' | ' \
     --beautify \
     'SELECT nickName, displayName, url FROM - WHERE status = "accepted" AND participationType = "現地参加"'

  Print only accepted applicants as JSON (working with jq command):
  $ connpass-applicants https://connpass.com/event/144296/ | jq \
     '[ .[] | select(.status == "accepted") | { name: .displayName, type: .participationType } ]'

  NOTE: the value of the status is one of "accepted", "waiting" and "canceled"
```

## Installation

```bash
yarn global add @suin/get-connpass-applicants-cli
```
