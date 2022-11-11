import { UiControlClient } from 'askui';

// Client is necessary to use the askui API
// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;
let auiAndroid: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {
  aui = await UiControlClient.build({
    uiControllerUrl: 'http://127.0.0.1:7007'
  });

  auiAndroid = await UiControlClient.build({
    uiControllerUrl: 'http://127.0.0.1:6769'
  });

  await aui.connect();
  await auiAndroid.connect();
});

afterAll(async () => {

  aui.close();
  auiAndroid.close();
});

export { aui, auiAndroid };
