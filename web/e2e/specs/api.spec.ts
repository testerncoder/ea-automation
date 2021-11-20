import { IResponseBody, IResponseType, API_ENDPOINT } from '../types';
import { browser, element, by } from 'protractor';

const Request = require('request');

describe('Music Festival Tests: ', function () {
  it('Health check 200 statusCode', (done) => {
    try {
      Request.get(
        {
          headers: { 'content-type': 'application/json' },
          url: API_ENDPOINT.GET_FESTIVALS_DATA,
        },
        (
          error: string,
          response: IResponseType,
          body: IResponseBody[] | string
        ) => {
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    } catch (err) {
      console.log(err);
    }
  });

  it('Music list API returns results with 200 response', (done) => {
    try {
      Request.get(
        {
          headers: { 'content-type': 'application/json' },
          url: API_ENDPOINT.GET_FESTIVALS_DATA,
        },
        (
          error: string,
          response: IResponseType,
          body: IResponseBody[] | string
        ) => {
          if (response.statusCode === 200) {
            const data =
              typeof body === 'string' && !!body ? JSON.parse(body) : body;
            // API should not return empty string
            expect(data).not.toBeNull();
            // API should contain results Array
            expect(Object.keys(data).length).toBeGreaterThanOrEqual(0);
          } else {
            // fail test if limit is exceeded
            expect(response.statusCode).not.toBe(429);
          }

          done();
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  it('Music list API must contain bands and respective required property --> name', (done) => {
    try {
      Request.get(
        {
          headers: { 'content-type': 'application/json' },
          url: API_ENDPOINT.GET_FESTIVALS_DATA,
        },
        (
          error: string,
          response: IResponseType,
          body: IResponseBody[] | string
        ) => {
          if (response.statusCode === 200) {
            const data =
              typeof body === 'string' && !!body ? JSON.parse(body) : body;
            if (data.length) {
              data.forEach((item: IResponseBody) => {
                expect(Object.keys(item)).toContain('bands');
                item.bands.forEach((band: any) => {
                  expect(Object.keys(band)).toContain('name');
                });
              });
            }
          } else {
            // fail test if limit is exceeded
            expect(response.statusCode).not.toBe(429);
          }

          done();
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  it('Verify error 429 status message incase of API limit error', (done) => {
    try {
      Request.get(
        {
          headers: { 'content-type': 'application/json' },
          url: API_ENDPOINT.GET_FESTIVALS_DATA,
        },
        (
          error: string,
          response: IResponseType,
          body: IResponseBody[] | string
        ) => {
          if (response.statusCode === 429) {
            expect(body).toEqual('Too many requests, throttling');
          }
          done();
        }
      );
    } catch (err) {
      console.log(err);
    }
  });
});
