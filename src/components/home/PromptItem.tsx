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

const PromptItem = ({
  heading,
  text,
  categories,
  langSymbol,
  slug,
}: IProps) => {
  //   const trimHeading =
  //     heading.length > 35 ? heading.substring(0, 25) + "..." : heading;
  const trimDescription =
    text.length > 500 ? text.substring(0, 500) + "..." : text;
  return (
    <Box textAlign="center">
      <Card variant="outlined" elevation={2}>
        <CardContent sx={{ bgcolor: "secondary.main" }}>
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
