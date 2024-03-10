import { ElectronAPI } from '@electron-toolkit/preload'
import { IInsertData } from '@renderer/types'


declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getApplications: () => void;
      getApplicationsAndRelatedData: () => void;
      insertApplication: (value: IInsertData) => void;
      testCrypto: (value: string) => void;
    }
  }
}
