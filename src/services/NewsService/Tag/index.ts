/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createTag = async (data: FieldValues) => {
  try {
    const res = await fetch(`NEXT_PUBLIC_BASE_API/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: JSON.stringify(data),
    });
    revalidateTag("TAG");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllTag = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tags`, {
      next: { tags: ["TAG"] },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteTag = async (tagId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tags/${tagId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    revalidateTag("TAG");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
