"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { INewsCategory, ITag, TUser } from "@/types";
import { getAllCategories } from "@/services/NewsService/Category";
import { getAllTag } from "@/services/NewsService/Tag";
import { getCurrentUser } from "@/services/AuthService";
import { addNews } from "@/services/NewsService/addNews";
import BDImageUploader from "@/components/ui/core/BDImageUploader";
import ImagePreviewer from "@/components/ui/core/BDImageUploader/imagePreviewer";
import Logo from "@/components/shared/logo/Logo";

export default function AddNewsForm() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [categories, setCategories] = useState<INewsCategory[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const [user, setUser] = useState<TUser>();

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      summary: "",
      category: "",
      tags: [],
      published: false,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, tagsData, userData] = await Promise.all([
        getAllCategories(),
        getAllTag(),
        getCurrentUser(),
      ]);
      setCategories(categoriesData?.data);
      setTags(tagsData?.data);
      setUser(userData?.data);
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFiles[0]);
      const newsData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        summary: data.summary,
        author: user?._id || "",
        category: data.category,
        tags: data.tags,
        published: data.published,
        thumbnail: "",
      };

      formData.append("data", JSON.stringify(newsData));

      const res = await addNews(formData);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/news");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while submitting the news.");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5">
      <div className="flex items-center space-x-4 mb-5">
        <Logo />
        <h1 className="text-xl font-bold">Add News</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none h-24" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none h-36" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (!field.value.includes(value)) {
                        field.onChange([...field.value, value]);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Tags (multiple)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tags.map((tag) => (
                        <SelectItem key={tag._id} value={tag._id}>
                          {tag.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {field.value.map((tagId: string) => {
                      const tag = tags.find((t) => t._id === tagId);
                      return (
                        <span
                          key={tagId}
                          className="bg-primary text-white px-2 py-1 rounded-full text-sm"
                        >
                          {tag?.name}
                        </span>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Published</FormLabel>
                  <FormControl>
                    <Input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Thumbnail</FormLabel>
              <div className="flex gap-4">
                <BDImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Image"
                />
                <ImagePreviewer
                  className="flex flex-wrap gap-4"
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              </div>
            </div>
          </div>
          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Publishing..." : "Publish News"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
