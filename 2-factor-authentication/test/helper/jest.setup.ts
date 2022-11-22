import { UiControlClient, UiController } from 'askui';

// Server for controlling the operating system
let uiController: UiController;

// Client is necessary to use the askui API
// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {

  uiController = new UiController();
  await uiController.start();
  aui = await UiControlClient.build({
    credentials: {
      workspaceId: 'd928f70b-7ff0-4cea-b9f6-c6522a2eb492',
      token: 'S7ZgaeBjuO8oARQSBhzb'
    }
  });
  await aui.connect();
});

afterAll(async () => {
  await uiController.stop();
  aui.close();
});

export { aui};
