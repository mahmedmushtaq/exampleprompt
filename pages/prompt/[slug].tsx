import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import FrontLayout from "../../src/layouts/FrontLayout";
import { GetStaticPaths, GetStaticProps } from "next";
import LoadingScreen from "../../src/components/shared/LoadingScreen";
import {
  approvePrompt,
  deletePrompt,
  getPromptBySlug,
  getAllPromptsSlugsOnly,
} from "../../src/libs/firebase/db/prompt";
import { IPromptData, UrlsList } from "../../src/globals/types";
import {
  Box,
  Typography,
  Unstable_Grid2 as Grid,
  Button,
  TextField,
} from "@mui/material";
import copy from "copy-to-clipboard";
import CustomCard from "../../src/components/shared/CustomCard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneIcon from "@mui/icons-material/Done";
import { useAuth } from "../../src/hooks/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { MESSAGE_KEYS } from "../../src/globals/constants";
import Link from "next/link";

interface IProps {
  prompt: IPromptData;
}

const PromptSlugPage = ({ prompt: promptInfo }: IProps) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const [prompt, setPrompt] = useState(promptInfo);
  const { userData, isAdmin } = useAuth();

  const isOwner = userData?.id === prompt.user.id;

  const handleCopy = async () => {
    setIsCopied(true);
    copy(prompt.prompt.replace(/<\/?[^>]+(>|$)/g, ""));
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

  const editPrompt = () => {
    router.push(UrlsList.editPrompt + "/" + promptInfo.slug);
  };

  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        // We only accept messages from this window to itself [i.e. not from any iframes]
        if (event.source != window) return;

        if (
          event?.data?.type ===
          MESSAGE_KEYS.RECEIVED_MSG_EXAMPLE_PROMPT_EXTENSION
        ) {
          this.window.open("https://chat.openai.com", "_blank");
        }
      },
      false
    );
  }, []);

  const usedPrompt = () => {
    const data = {
      type: MESSAGE_KEYS.SEND_MSG_EXAMPLE_PROMPT_EXTENSION,
      text: promptInfo.prompt,
    };
    window.postMessage(data, "*");
  };

  if (router.isFallback) {
    return <LoadingScreen />;
  }

  return (
    <FrontLayout
      pageDescription="Get Help From Other People Command"
      pageTitle="Chatgpt prompt ideas"
      maxWidth="md"
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
        <Typography variant="h4" sx={{ mt: 5, mb: 2 }}>
          Prompt
        </Typography>

        <TextField
          fullWidth
          id="prompt"
          variant="outlined"
          name="prompt"
          multiline
          minRows={2}
          defaultValue={prompt.prompt}
          InputProps={{
            readOnly: true,
          }}
        />

        <Typography
          variant="h6"
          sx={{ mt: 5, mb: 2, whiteSpace: "pre-wrap", wordWrap: "break-word" }}
        >
          PromptExample
        </Typography>

        <TextField
          fullWidth
          id="outlined-basic"
          variant="outlined"
          name="promptExample"
          multiline
          minRows={2}
          defaultValue={prompt.promptExample}
          InputProps={{
            readOnly: true,
          }}
        />

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
          {(isAdmin || isOwner) && (
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

          {(isAdmin || isOwner) && prompt.approved && (
            <Grid>
              <Button
                color="secondary"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={editPrompt}
              >
                Edit
              </Button>
            </Grid>
          )}

          <Grid>
            <Button
              id="prompt-usedit"
              color="info"
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={usedPrompt}
            >
              Use the prompt
            </Button>
          </Grid>
        </Grid>
        <Box mt={3} mb={10} id="chrome-extension-installed">
          <Typography color="primary">
            Please install the chrome extension to directly use the prompt.
            After installing the extension please refresh the page.
            <Link
              style={{ textDecoration: "none", marginLeft: 10 }}
              href="https://chrome.google.com/webstore/detail/chatgpt-prompts-by-exampl/cbojogfgmmilecmiickfniajoffjgcnd/related"
            >
              Extension link
            </Link>
          </Typography>
        </Box>
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
    prompt = await getPromptBySlug(String(slug!));
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
