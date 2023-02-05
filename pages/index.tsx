import FrontLayout from "../src/layouts/FrontLayout";
import Home from "../src/components/home";
import type { GetStaticProps } from "next";
import { getAllPromptsByApprovedStatus } from "../src/libs/firebase/db/prompt";
import { IPromptData } from "../src/globals/types";

interface IProps {
  prompts: IPromptData[];
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

  return {
    props: {
      prompts,
    },
    // revalidate: 5,
  };
};
