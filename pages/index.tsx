import FrontLayout from "../src/layouts/FrontLayout";
import Home from "../src/components/home";
import type { GetStaticProps } from "next";
import { getAllPromptsByApprovedStatus } from "../src/libs/firebase/db/prompt";
import { ICategoryData, IPromptData } from "../src/globals/types";
import { getAllCategories } from "../src/libs/firebase/db/category";

interface IProps {
  prompts: IPromptData[];
  categories: ICategoryData[];
}

export default function HomePage(props: IProps) {
  return (
    <FrontLayout
      pageDescription="Get Help From Other People Command"
      pageTitle="Chatgpt prompt ideas"
    >
      <Home {...props} />
    </FrontLayout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  // This is where the error occurs
  const prompts = await getAllPromptsByApprovedStatus(true);
  const categories = await getAllCategories();

  return {
    props: {
      prompts,
      categories,
    },
    revalidate: 1,
  };
};
