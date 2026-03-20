import { BaseURL, handleDecrypt } from "@/resources/utils/helper";
import { cookies } from "next/headers";

import { redirect } from "next/navigation";

export const getApi = async (
  endpoint = "",
  redirectUrl,
  config = { cache: "no-store" }
) => {
  const Cookies = cookies();
  const accessToken = handleDecrypt(Cookies.getAll("_xpdx")?.[0]?.value);


  console.log("API URLs:", BaseURL(endpoint));   

  try {
    const response = await fetch(BaseURL(endpoint), {
      method: "GET",
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        "Content-Type": "application/json",
      },
      ...config,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    return await response.json();
  } catch (error) {
    if (redirectUrl) {
      return redirect(redirectUrl);
    }
    return null;
  }
};
