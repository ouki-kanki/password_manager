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

export interface ApplicationData {
  id: string
  name: string;
  email: string;
  username: string;
  password: string
}
