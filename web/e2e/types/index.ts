export interface IResponseBody {
  name: 'string';
  bands: [
    {
      name: 'string';
      recordLabel: 'string';
    }
  ];
}
export interface IResponseType {
  statusCode: 200 | 429 ;
}

export enum API_ENDPOINT  {
  GET_FESTIVALS_DATA = "http://localhost:4200/api/v1/festivals"
}