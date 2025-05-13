"use client";
import Headline from "@/components/modules/Headline/Headline";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div className="bg-white w-full">
      <Headline />
    </div>
  );
};

export default HomePage;
