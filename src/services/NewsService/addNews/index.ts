/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addNews = async (newsData: FormData): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/news`, {
      method: "POST",
      body: newsData,
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    revalidateTag("NEWS");
    return res.json();
  } catch (error: any) {
    console.error("Add News Error:", error);
    return {
      success: false,
      message: error.message || "Unexpected error occurred",
    };
  }
};
