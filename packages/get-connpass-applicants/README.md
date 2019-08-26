# `@suin/get-connpass-applicants`

A simple function that gets the applicants from a given Connpass event URL.

## Usage

```typescript
import { getConnpassApplicants, Applicants } from '@suin/get-connpass-applicants'

(async () => {
  const url = 'https://example.connpass.com/event/123/'
  const applicants: Applicants = await getConnpassApplicants(url)
  console.log(applicants)
})()
```

For about the API of the `Applicants`, please see [Applicants.ts](./src/Applicants.ts).

## Installation

```bash
yarn add @suin/get-connpass-applicants
```
