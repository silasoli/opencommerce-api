export type NuvemshopError = {
  response: {
    status: number;
    data: {
      code: number;
      message: string;
      description: string;
    };
  };
};
