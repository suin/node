import axios, { AxiosInstance } from 'axios'
import * as fs from 'fs'
import { Applicants, getConnpassApplicants } from '../src'

jest.mock('axios')

// tslint:disable-next-line:no-any
const axiosMock: jest.Mocked<AxiosInstance> = axios as any
const mockHtmlDir = `${__dirname}/../test/`
const file = (name: string) => fs.readFileSync(`${mockHtmlDir}/${name}`)

describe('getConnpassApplicants', () => {
  describe('An event that has three participants', () => {
    let applicants: Applicants

    beforeEach(async () => {
      axiosMock.get.mockResolvedValue({ data: file('three-participants.html') })
      const url = 'https://example.connpass.com/event/123/'
      applicants = await getConnpassApplicants(url)
    })

    test('should return participants', () => {
      expect(applicants.participants.length).toBe(3)
      expect(applicants.participants).toMatchObject([
        {
          url: 'https://connpass.com/user/alice.test/',
          name: 'Alice',
          participationType: '参加枠1',
        },
        {
          url: 'https://connpass.com/user/bob.test/',
          name: 'Bob',
          participationType: '参加枠1',
        },
        {
          url: 'https://connpass.com/user/carol.test/',
          name: 'Carol',
          participationType: '参加枠1',
        },
      ])
    })

    test('should return zero waitlist', () => {
      expect(applicants.waitlist.length).toBe(0)
    })

    test('should return zero cancelled', () => {
      expect(applicants.waitlist.length).toBe(0)
    })
  })

  describe('An event that has two participation blocks', () => {
    let applicants: Applicants

    beforeEach(async () => {
      axiosMock.get.mockResolvedValue({
        data: file('two-participation-blocks.html'),
      })
      const url = 'https://example.connpass.com/event/123/'
      applicants = await getConnpassApplicants(url)
    })

    test('should return participants', () => {
      expect(applicants.participants.length).toBe(4)
      expect(applicants.participants).toMatchObject([
        {
          url: 'https://connpass.com/user/alice.test/',
          name: 'Alice',
          participationType: '参加枠1',
        },
        {
          url: 'https://connpass.com/user/bob.test/',
          name: 'Bob',
          participationType: '参加枠1',
        },
        {
          url: 'https://connpass.com/user/carol.test/',
          name: 'Carol',
          participationType: '参加枠2',
        },
        {
          url: 'https://connpass.com/user/dave.test/',
          name: 'Dave',
          participationType: '参加枠2',
        },
      ])
    })
  })

  describe('An event that has two waitlist', () => {
    let applicants: Applicants

    beforeEach(async () => {
      axiosMock.get.mockResolvedValue({ data: file('two-waitlist.html') })
      const url = 'https://example.connpass.com/event/123/'
      applicants = await getConnpassApplicants(url)
    })

    test('should return waitlist', () => {
      expect(applicants.waitlist.length).toBe(2)
      expect(applicants.waitlist).toMatchObject([
        {
          url: 'https://connpass.com/user/dave.test/',
          name: 'Dave',
          participationType: '参加枠1',
        },
        {
          url: 'https://connpass.com/user/eva.test/',
          name: 'Eva',
          participationType: '参加枠1',
        },
      ])
    })
  })

  describe('An event that has two cancelled', () => {
    let applicants: Applicants

    beforeEach(async () => {
      axiosMock.get.mockResolvedValue({ data: file('two-cancelled.html') })
      const url = 'https://example.connpass.com/event/123/'
      applicants = await getConnpassApplicants(url)
    })

    test('should return cancelled', () => {
      expect(applicants.cancelled.length).toBe(2)
      expect(applicants.cancelled).toMatchObject([
        {
          url: 'https://connpass.com/user/dave.test/',
          name: 'Dave',
          participationType: '参加枠1',
        },
        {
          url: 'https://connpass.com/user/eva.test/',
          name: 'Eva',
          participationType: '参加枠1',
        },
      ])
    })
  })
})
