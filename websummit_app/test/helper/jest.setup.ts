import { AnnotationLevel, UiControlClient, UiController } from '/home/mlikasam/askui/askui/packages/askui-nodejs/src/main';

// Server for controlling the operating system
let uiController: UiController;

// Client is necessary to use the askui API
// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;
let aui1: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {
  aui = await UiControlClient.build({
    uiControllerUrl: 'http://127.0.0.1:6769',
    'inferenceServerUrl': 'http://localhost:5000'
  });



  await aui.connect();
});

afterAll(async () => {
  //await uiController.stop();

  aui.close();
});

export { aui };
