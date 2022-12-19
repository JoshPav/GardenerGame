import { ApiClient } from "gardener-schema";
import React from "react";

let globalInstance: ApiClient<unknown>;

export const ApiContext = React.createContext<ApiClient<unknown>>(
  getApiInstance()
);

/**
 * Only to be used in places where useContext is not allowed.
 * @returns
 */
export function getApiInstance(): ApiClient<unknown> {
  if (!globalInstance) {
    globalInstance = new ApiClient({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });
  }

  return globalInstance;
}
