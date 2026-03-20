import { jackApiClient } from "./api";

const JACK_BASE = "/jack";

export const jackApi = {
 getProducts: ({ pageNumber = 1, pageSize = 25 }) => {
    return jackApiClient.get(
      `${JACK_BASE}/items?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  },
};