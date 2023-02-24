import config from "../globals/config";
import { GA_EVENTS_ACTIONS } from "../globals/constants/gaEvents";

// log the pageview with their URL
export const pageView = (url: string) => {
  if (config.googleAnalyticId) {
    // google analytical id is only present in prod
    (window as any)?.gtag("config", config.googleAnalyticId, {
      page_path: url,
    });
  } else if (config.env === "prod") {
    // if google analytical id is not present in prod then it must be an error
    console.error(
      "[pageview]:- Google analytical id is missing. Please check it "
    );
  }
};

// log specific events happening.
export const gaEvent = ({
  action,
  params,
}: {
  action: GA_EVENTS_ACTIONS;
  params: any;
}) => {
  if (config.googleAnalyticId) {
    // google analytical id is only present in prod
    (window as any)?.gtag("event", action, params);
  } else if (config.env === "prod") {
    // if google analytical id is not present in prod then it must be an error
    console.error(
      "[event]:- Google analytical id is missing. Please check it "
    );
  }
};
