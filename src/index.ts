import * as core from "@actions/core";
import * as github from "@actions/github";

async function run(): Promise<void> {
  try {
    const name = core.getInput("who-to-greet");
    console.log(`Hello ${name}!`);

    const time = new Date().toTimeString();
    core.setOutput("time", time);

    const payload = JSON.stringify(github.context.payload, null, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
