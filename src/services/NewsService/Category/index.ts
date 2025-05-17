"use server";
import { revalidateTag } from "next/cache";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const newsCategory = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/categorys/create-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("CATEGORY");

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/categorys`, {
      next: { tags: ["CATEGORY"] },
    });
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/categorys/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );

    revalidateTag("CATEGORY");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
