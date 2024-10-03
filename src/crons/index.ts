// import { oldVisitCronJob } from "./old-visit.cron";
import { removeOldPasswordsCronJob } from "./remove-old-passwords.cron";
import { removeOldTokensCronJob } from "./remove-old-tokens.cron";

export const cronRunner = () => {
  removeOldTokensCronJob.start();
  removeOldPasswordsCronJob.start();
  // oldVisitCronJob.start();
};
