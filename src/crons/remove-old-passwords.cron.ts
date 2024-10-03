import { CronJob } from "cron";

import { configs } from "../config/configs";
import { timeHelper } from "../helpers/time.helper";
import { oldPasswordsRepository } from "../repositories/old-passwords.repository";

const handler = async () => {
  try {
    const { value, unit } = timeHelper.parseConfigString(
      configs.OLD_PASSWORD_LIFETIME,
    );

    const date = timeHelper.subtractByParams(value, unit);
    const deletedCount = await oldPasswordsRepository.deleteBeforeDate(date);
    console.log(`Deleted ${deletedCount} old passwords`);
  } catch (error) {
    console.error(error);
  }
};

export const removeOldPasswordsCronJob = new CronJob(
  "0,20,40 * * * * *",
  handler,
);
