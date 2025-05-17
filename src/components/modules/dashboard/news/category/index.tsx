/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { INewsCategory } from "@/types";
import CreateCategoryModal from "./CreateCategoryModal";
import { BDTable } from "@/components/ui/core/BDTable";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "sonner";
import { deleteCategory } from "@/services/NewsService/Category";
import { Trash } from "lucide-react";
import DeleteConfirmationModal from "@/components/ui/core/BDModal/DeleteConfirmationModal";

type TcategoriesProps = {
  categories: INewsCategory[];
};

const ManageCategories = ({ categories }: TcategoriesProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: INewsCategory) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteCategory(selectedId);
        console.log(res);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<INewsCategory>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-center">Category Name</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center space-x-3">
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="text-center">Description</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3 justify-center">
          <p>{row.original.description}</p>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center space-x-3">
          <button
            className="text-red-500 cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Manage categories</h1>
        <CreateCategoryModal />
      </div>
      <BDTable data={categories} columns={columns} />
       <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageCategories;
