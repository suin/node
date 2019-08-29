import axios, { AxiosInstance } from 'axios'
import * as fs from 'fs'
import { Applicants, getConnpassApplicants } from '../src'

jest.mock('axios')

// tslint:disable-next-line:no-any
const axiosMock: jest.Mocked<AxiosInstance> = axios as any
const mockHtmlDir = `${__dirname}/../test/`
const file = (name: string) => fs.readFileSync(`${mockHtmlDir}/${name}`)

describe('getConnpassApplicants', () => {
  describe('An event that has three accepted', () => {
    let applicants: Applicants

    beforeEach(async () => {
      axiosMock.get.mockResolvedValue({ data: file('three-accepted.html') })
      const url = 'https://example.connpass.com/event/123/'
      applicants = await getConnpassApplicants(url)
    })

    test('should return accepted', () => {
      expect(applicants.accepted.length).toBe(3)
      expect(applicants.accepted.toArray).toMatchObject([
        {
          url: 'https://connpass.com/user/alice.test/',
          displayName: 'Alice',
          participationType: '参加枠1',
          status: 'accepted',
        },
        {
          url: 'https://connpass.com/user/bob.test/',
          displayName: 'Bob',
          participationType: '参加枠1',
          status: 'accepted',
        },
        {
          url: 'https://connpass.com/user/carol.test/',
          displayName: 'Carol',
          participationType: '参加枠1',
          status: 'accepted',
        },
      ])
    })

    test('should return zero waiting', () => {
      expect(applicants.waiting.length).toBe(0)
    })

    test('should return zero canceled', () => {
      expect(applicants.waiting.length).toBe(0)
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

    test('should return accepted', () => {
      expect(applicants.accepted.length).toBe(4)
      expect(applicants.accepted.toArray).toMatchObject([
        {
          url: 'https://connpass.com/user/alice.test/',
          displayName: 'Alice',
          participationType: '参加枠1',
        },
        {
          url: 'https://connpass.com/user/bob.test/',
          displayName: 'Bob',
          participationType: '参加枠1',
        },
        {
          url: 'https://connpass.com/user/carol.test/',
          displayName: 'Carol',
          participationType: '参加枠2',
        },
        {
          url: 'https://connpass.com/user/dave.test/',
          displayName: 'Dave',
          participationType: '参加枠2',
        },
      ])
    })
  })

  describe('An event that has two waiting', () => {
    let applicants: Applicants

    beforeEach(async () => {
      axiosMock.get.mockResolvedValue({ data: file('two-waiting.html') })
      const url = 'https://example.connpass.com/event/123/'
      applicants = await getConnpassApplicants(url)
    })

    test('should return waiting', () => {
      expect(applicants.waiting.length).toBe(2)
      expect(applicants.waiting.toArray).toMatchObject([
        {
          url: 'https://connpass.com/user/dave.test/',
          displayName: 'Dave',
          participationType: '参加枠1',
          status: 'waiting',
        },
        {
          url: 'https://connpass.com/user/eva.test/',
          displayName: 'Eva',
          participationType: '参加枠1',
          status: 'waiting',
        },
      ])
    })
  })

  describe('An event that has two canceled', () => {
    let applicants: Applicants

    beforeEach(async () => {
      axiosMock.get.mockResolvedValue({ data: file('two-canceled.html') })
      const url = 'https://example.connpass.com/event/123/'
      applicants = await getConnpassApplicants(url)
    })

    test('should return canceled', () => {
      expect(applicants.canceled.length).toBe(2)
      expect(applicants.canceled.toArray).toMatchObject([
        {
          url: 'https://connpass.com/user/dave.test/',
          displayName: 'Dave',
          participationType: '参加枠1',
          status: 'canceled',
        },
        {
          url: 'https://connpass.com/user/eva.test/',
          displayName: 'Eva',
          participationType: '参加枠1',
          status: 'canceled',
        },
      ])
    })
  })
})
