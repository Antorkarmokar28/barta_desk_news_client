"use client";
import { BDTable } from "@/components/ui/core/BDTable";
import CreateTagModal from "./CreateTagModal";
import DeleteConfirmationModal from "@/components/ui/core/BDModal/DeleteConfirmationModal";
import { ITag } from "@/types";
import { toast } from "sonner";
import { useState } from "react";
import { deleteTag } from "@/services/NewsService/Tag";
import { Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type TTagsProps = {
  tags: ITag[];
};

const ManageTag = ({ tags }: TTagsProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: ITag) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteTag(selectedId);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<ITag>[] = [
    {
      accessorKey: "name",
      header: () => <div className="text-center">Tag Name</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center space-x-3">
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "slug",
      header: () => <div className="text-center">Slug</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3 justify-center">
          <p>{row.original.slug}</p>
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
        <h1 className="text-xl font-bold">Manage Tags</h1>
        <CreateTagModal />
      </div>
      <BDTable data={tags} columns={columns} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageTag;
