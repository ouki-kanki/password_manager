export interface IInsertData {
  applicationName: string;
  username?: string;
  email?: string;
  password: string
}

export interface IEncrypt {
  value: string;
  secret: string;
}

export interface GetApplicationsQueryParams {
  name?: string;
  username?: string;
  email?: string
}
