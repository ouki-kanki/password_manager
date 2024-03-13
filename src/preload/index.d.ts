import { ElectronAPI } from '@electron-toolkit/preload'
import { IInsertData } from '@renderer/types'
import { GetApplicationsQueryParams } from 'src/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getApplications: () => void;
      getApplicationsAndRelatedData: (params?: GetApplicationsQueryParams) => void;
      insertApplication: (value: IInsertData) => void;
      testCrypto: (value: string) => void;
    }
  }
}
