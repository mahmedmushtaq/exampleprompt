import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { IPromptData, UrlsList } from "../../globals/types";
import Link from "next/link";

interface IProps extends IPromptData {}

const colors = [
  "primary.main",
  "secondary.main",
  "colors.darkblue",
  "colors.lightgreen",
];

const PromptItem = ({
  heading,
  prompt,
  categories,
  langSymbol,
  slug,
}: IProps) => {
  const trimDescription =
    prompt.length > 500 ? prompt.substring(0, 500) + "..." : prompt;
  return (
    <Box textAlign="center">
      <Card elevation={2}>
        <CardContent
          sx={{ bgcolor: colors[Math.floor(Math.random() * colors.length)] }}
        >
          <Typography
            variant="h6"
            color="white"
            sx={{ cursor: "pointer", textDecoration: "none" }}
            component={Link}
            href={UrlsList.promptInfo + `/${slug}`}
          >
            {heading}
          </Typography>
        </CardContent>
        <Grid container justifyContent="center">
          <Grid>
            <Typography component="div" sx={{ fontSize: 12 }}>
              Categories:{" "}
              {categories.map(
                (cat, i) =>
                  `${cat.name} ${i + 1 !== categories.length ? "," : ""}`
              )}
            </Typography>
          </Grid>
          {/* <Grid>
            <Typography component="div" sx={{ fontSize: 12 }}>
              language: {langSymbol}
            </Typography>
          </Grid> */}
        </Grid>
        <CardActions sx={{ textAlign: "center" }}>
          <Button
            LinkComponent={Link}
            href={`/prompt/${slug}`}
            size="small"
            sx={{ fontWeight: 600 }}
            fullWidth
          >
            Open To Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PromptItem;
