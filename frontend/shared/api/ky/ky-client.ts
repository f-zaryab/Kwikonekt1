import ky from "ky";

export const kyClientAPI = ky.create({
  baseUrl: "http://localhost:5000/api/",

  timeout: 15_000,
  headers: {
    accept: "application/json",
  },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        console.log("Request:", request.method, request.url);
      },
    ],
    afterResponse: [
      ({ response }) => {
        console.log("Response:", response.status);
      },
    ],
  },

  retry: 0,
});
