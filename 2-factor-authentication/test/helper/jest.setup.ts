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
      workspaceId: '<your workspace id>',
      token: '<your access token>'
    }
  });
  await aui.connect();
});

afterAll(async () => {
  await uiController.stop();
  aui.close();
});

export { aui};
