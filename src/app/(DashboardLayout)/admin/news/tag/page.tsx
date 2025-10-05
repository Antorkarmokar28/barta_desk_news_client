import ManageTag from "@/components/modules/dashboard/news/tag";
import { getAllTag } from "@/services/NewsService/Tag";

const TewsTagPage = async () => {
  const data = await getAllTag();
  return (
    <div>
      <ManageTag tags={data.data} />
    </div>
  );
};

export default TewsTagPage;
