
import PageMeta from "../../components/common/PageMeta";
import BasicTables from "../Tables/Table";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Ecommerce Dashboard"
        description="This is Ecommerce Dashboard page"
      />
      <BasicTables />
    </>
  );
}
