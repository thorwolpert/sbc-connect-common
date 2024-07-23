import { AccountType } from '~/enums/account-type'
import { AccountStatus } from '~/enums/account-status'
import { UserSettingsType } from '~/enums/user-settings-type'

export interface UserSettings {
  id: string
  type: UserSettingsType
  urlpath: string
  urlorigin: string
  accountType?: AccountType
  accountStatus?: AccountStatus
  additionalLabel?: string
  label?: string
}
