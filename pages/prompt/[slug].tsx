import { useState } from "react";
import { useRouter } from "next/router";
import FrontLayout from "../../src/layouts/FrontLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import LoadingScreen from "../../src/components/shared/LoadingScreen";
import {
  approvePrompt,
  deletePrompt,
  getAllPromptsBySlug,
  getAllPromptsSlugsOnly,
} from "../../src/libs/firebase/db/prompt";
import { IPromptData } from "../../src/globals/types";
import { Box, Typography, Unstable_Grid2 as Grid, Button } from "@mui/material";
import copy from "copy-to-clipboard";
import CustomCard from "../../src/components/shared/CustomCard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { useAuth } from "../../src/hooks/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { RoleTypes } from "../../src/globals/types";

interface IProps {
  prompt: IPromptData;
}

const PromptSlugPage = ({ prompt: promptInfo }: IProps) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [prompt, setPrompt] = useState(promptInfo);
  const { userData, isAdmin } = useAuth();

  const handleCopy = async () => {
    setIsCopied(true);
    copy(prompt.text);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  const handleDeletePrompt = async () => {
    await deletePrompt(prompt.id);
    router.push("/");
  };

  const handleApprovePrompt = async () => {
    await approvePrompt(prompt.id);
    setPrompt({ ...prompt, approved: true });
  };

  if (router.isFallback) {
    return <LoadingScreen />;
  }

  return (
    <FrontLayout
      pageDescription="Get Help From Other People Command"
      pageTitle="Chatgpt prompt ideas"
    >
      <Box textAlign="center">
        <Typography
          variant="h4"
          component="h2"
          sx={{ mt: 4 }}
          color="secondary"
        >
          {prompt.heading}
        </Typography>
        <Typography variant="h6" sx={{ my: 5 }}>
          Detailed description
        </Typography>

        <CustomCard>{prompt.text}</CustomCard>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 5 }}
          spacing={2}
        >
          <Grid>
            <Button
              variant="contained"
              startIcon={isCopied ? <DoneIcon /> : <ContentCopyIcon />}
              onClick={handleCopy}
            >
              {isCopied ? "Copied" : " Copy Text"}
            </Button>
          </Grid>
          {(isAdmin || userData?.id === prompt.user.id) && (
            <Grid>
              <Button
                color="error"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={handleDeletePrompt}
              >
                Delete
              </Button>
            </Grid>
          )}
          {isAdmin && !prompt.approved && (
            <Grid>
              <Button
                color="secondary"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={handleApprovePrompt}
              >
                Approve
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </FrontLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // fetch all prompts slugs
  const slugs = await getAllPromptsSlugsOnly();
  const paths = slugs.map(({ slug, id }) => {
    return {
      params: { slug },
    };
  });
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // This is where the error occurs
  // const prompts = await getAllPromptsByApprovedStatus(true);

  let prompt: IPromptData | {} = {};

  if (context.params) {
    const { slug } = context.params;
    prompt = await getAllPromptsBySlug(String(slug!));
    console.log("prompt is ", prompt);
  }

  return {
    props: {
      prompt,
    },
    notFound: !prompt,
    revalidate: 1, // revalidate after 1 seconds everytime
  };
};

export default PromptSlugPage;
