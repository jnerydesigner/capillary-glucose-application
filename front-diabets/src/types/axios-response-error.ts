/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AxiosResponseError {
  message: string;
  name: string;
  stack: string;
  config: Config;
  code: string;
  status: number;
  response: DataResponse;
}

export interface DataResponse {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
}

export interface Config {
  transitional: Transitional;
  adapter: string[];
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers;
  baseURL: string;
  method: string;
  url: string;
  data: string;
  allowAbsoluteUrls: boolean;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Env {}

export interface Headers {
  Accept: string;
  "Content-Type": string;
}
