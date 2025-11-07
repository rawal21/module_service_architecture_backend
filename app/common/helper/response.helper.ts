interface IResponse {
  sucess: boolean;
  message?: string;
  data: object | null | any;
}

export type ErrorRespons = IResponse & {
  error_code: number;
};

export const createResponse = (
  data: IResponse["data"],
  message?: string
): IResponse => {
  return { data, message, sucess: true };
};
