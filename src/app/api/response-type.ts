export type ActionResponse<T> = {
  error: boolean;
  message: string;
  payload?: T;
};
