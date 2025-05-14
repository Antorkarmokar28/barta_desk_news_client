import { INewsCategory } from "@/types";
import CreateCategoryModal from "./CreateCategoryModal";
import { BDTable } from "@/components/ui/core/BDTable";
import { ColumnDef } from "@tanstack/react-table";

type TcategoriesProps = {
  categories: INewsCategory[];
};

const ManageCategories = ({ categories }: TcategoriesProps) => {

  const columns: ColumnDef<INewsCategory>[] = [
    {
      accessorKey: "name",
      header: "Category Name",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Manage categories</h1>
        <CreateCategoryModal />
      </div>
      <BDTable data={categories} columns={columns} />
    </div>
  );
};

export default ManageCategories;
