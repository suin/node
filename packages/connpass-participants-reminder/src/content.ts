import { AirtableParticipationHistoryStore } from './participation-history/adapter/airtable'

type Options = Readonly<{
  apiKey: string // todo: this may be undefined
  appId: string // todo: this may be undefined
  tableName: string // todo: this may be undefined
  viewName: string // todo: this may be undefined
}>

const main = async ({ apiKey, appId, tableName, viewName }: Options) => {
  const applicants = new Map<string, Element>()

  document
    .querySelectorAll('.participation_table_area tbody tr')
    .forEach(value => {
      const a = value.querySelector('.display_name a')
      if (a) {
        const href = a.getAttribute('href')
        if (href) {
          const matches = /^https:\/\/connpass\.com\/user\/([^\/]+)\/$/.exec(
            href,
          )
          if (matches) {
            const connpassUsername = matches[1]
            applicants.set(connpassUsername, value)
          }
        }
      }
    })

  const participationHistoryStore = new AirtableParticipationHistoryStore({
    apiKey,
    appId,
    tableName,
    viewName,
  })
  const participationHistories = await participationHistoryStore.find(
    Array.from(applicants.keys()),
  )

  applicants.forEach((element, username) => {
    const history = participationHistories.get(username)
    if (history) {
      const displayNameEl = element.querySelector('.display_name')
      const fontColor = '#007acc'
      if (displayNameEl) {
        const nicknameEl = document.createElement('span')
        nicknameEl.style.color = fontColor
        nicknameEl.innerText = `(${history.nickname})`
        displayNameEl.append(nicknameEl)
      }

      const userInfoEl = element.querySelector('.user_info')
      if (userInfoEl) {
        const statusEl = document.createElement('p')
        statusEl.style.color = fontColor
        const participationCountLabelEl = document.createElement('span')
        participationCountLabelEl.innerText = '参加: '
        participationCountLabelEl.style.fontWeight = 'bold'
        const lastParticipationLabelEl = document.createElement('span')
        lastParticipationLabelEl.innerText = '前回: '
        lastParticipationLabelEl.style.fontWeight = 'bold'

        statusEl.append(
          participationCountLabelEl,
          `${history.participationCount + 1}回目`,
          ` / `,
          lastParticipationLabelEl,
          `${history.lastParticipationDate} (${history.lastParticipationType})`,
        )
        if (history.experience) {
          const experienceLabelEl = document.createElement('span')
          experienceLabelEl.innerText = '前回TS歴: '
          experienceLabelEl.style.fontWeight = 'bold'
          statusEl.append(` / `, experienceLabelEl, history.experience)
        }
        userInfoEl.append(statusEl)

        if (history.selfIntroduction) {
          const selfIntroductionEl = document.createElement('p')
          selfIntroductionEl.style.fontStyle = 'italic'
          selfIntroductionEl.style.color = fontColor
          selfIntroductionEl.innerText = history.selfIntroduction
          userInfoEl.append(selfIntroductionEl)
        }
      }
    }
  })
}

chrome.storage.sync.get(null, options => {
  main(options as Options).catch(reason => {
    throw reason
  })
})
