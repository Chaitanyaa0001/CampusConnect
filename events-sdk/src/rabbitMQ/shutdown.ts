import { closeRabbitMQ } from "./connection.js";

export const onShutdown = (
  cleanups: Array<
    () =>
      | Promise<void>
      | void
  > = []
) => {
  let shuttingDown =
    false;

  const shutdown =
    async (
      signal: string
    ) => {
      if (shuttingDown) {
        return;
      }

      shuttingDown = true;

      console.log(
        `[shutdown] ${signal} received`
      );

      setTimeout(() => {
        process.exit(1);
      }, 15_000).unref();

      for (
        const cleanup of
        cleanups
      ) {
        try {
          await cleanup();
        } catch (error) {
          console.error(
            "[shutdown] cleanup failed",
            error
          );
        }
      }

      await closeRabbitMQ();

      process.exit(0);
    };

  process.on(
    "SIGTERM",
    () => shutdown("SIGTERM")
  );

  process.on(
    "SIGINT",
    () => shutdown("SIGINT")
  );
};