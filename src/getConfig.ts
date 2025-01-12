import { existsSync, readFileSync } from 'fs'
import { CONFIG_PATH } from './constants'
import { printInvalidConfigFile, printConfigFileNotFound } from './print'
import { Config } from './types'

const getConfig = (): Config => {
  if (!existsSync(CONFIG_PATH)) {
    printConfigFileNotFound(CONFIG_PATH)
    process.exit(1)
  }

  let config
  
  try {
    config = JSON.parse(readFileSync(CONFIG_PATH, 'utf8').trim())
  } catch (e) {
    printInvalidConfigFile(CONFIG_PATH)
    process.exit(1)
  }

  if (!config.token || !config['workspace-id']) {
    printInvalidConfigFile(CONFIG_PATH)
    process.exit(1)
  }

  return config
}

export default getConfig
