import { Dispatch, SetStateAction } from "react";
import { Input } from "../../input";

type TImageUploaderProps = {
  imageFile: File[] | [];
  setImageFile: Dispatch<SetStateAction<[] | File[]>>;
};

const BDImageUploader = ({ imageFile, setImageFile }: TImageUploaderProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFile((prev) => [...prev, file]);
    event.target.value = "";
  };
  console.log(imageFile);
  return (
    <div>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
      />
    </div>
  );
};

export default BDImageUploader;
