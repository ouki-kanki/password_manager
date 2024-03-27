import { ElectronAPI } from '@electron-toolkit/preload'
import { IInsertData } from '@renderer/types'
import { GetApplicationsQueryParams } from 'src/types'

import type { ApplicationData } from 'src/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getApplications: () => void;
      getApplicationsAndRelatedData: (params?: GetApplicationsQueryParams) => Array<ApplicationData>;
      insertApplication: (value: IInsertData) => void;
      testCrypto: (value: string) => void;
    }
  }
}
