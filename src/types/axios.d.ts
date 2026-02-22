import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipLoading?: boolean;
    skipErrorToast?: boolean;
  }
}
