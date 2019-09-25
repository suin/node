const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement
const appIdInput = document.getElementById('appId') as HTMLInputElement
const tableNameInput = document.getElementById('tableName') as HTMLInputElement
const viewNameInput = document.getElementById('viewName') as HTMLInputElement
const statusLabel = document.getElementById('status')!

const saveOptions = () => {
  // 設定値を変数に格納
  const apiKey = apiKeyInput.value
  const appId = appIdInput.value
  const tableName = tableNameInput.value
  const viewName = viewNameInput.value
  const data = { apiKey, appId, tableName, viewName }
  chrome.storage.sync.set(data, () => {
    statusLabel.textContent = '保存しました!'
    setTimeout(() => {
      statusLabel.textContent = ''
    }, 1000)
  })
}

const restoreOptions = () => {
  chrome.storage.sync.get(
    {
      apiKey: '',
      appId: '',
      tableName: '',
      viewName: '',
    },
    ({ apiKey, appId, tableName, viewName }) => {
      apiKeyInput.value = apiKey
      appIdInput.value = appId
      tableNameInput.value = tableName
      viewNameInput.value = viewName
    },
  )
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('save')!.addEventListener('click', saveOptions)
