import ManageCategories from "@/components/modules/dashboard/news/category";
import { getAllCategories } from "@/services/NewsService/Category";
import React from "react";

const NewsCategoryPage = async () => {
  const data = await getAllCategories();
  return (
    <div>
      <ManageCategories categories={data.data} />
    </div>
  );
};

export default NewsCategoryPage;
