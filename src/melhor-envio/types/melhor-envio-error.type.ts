export type MelhorEnvioError = {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
};
