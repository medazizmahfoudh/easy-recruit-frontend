export interface ApiResponse<T> {
  data: Array<T> | T;
  success: boolean;
  "api-version": string;
}
