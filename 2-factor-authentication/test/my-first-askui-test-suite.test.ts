import { aui, auiAndroid } from './helper/jest.setup';

describe('jest with askui', () => {
  it('Login in Github', async () => {

    await aui.mouseLeftClick().exec();
    await aui.click().text().withText('Sign in').exec();
    await aui
      .typeIn('<Username>', { isSecret: true, secretMask: '**' })
      .textfield()
      .below()
      .text()
      .withText('Username or email address')
      .exec();
    await aui
      .pressKey('escape')
      .exec()
    await aui
      .typeIn('<password>', { isSecret: true, secretMask: '**' })
      .textfield()
      .below()
      .text()
      .withText('Password')
      .exec();

    await aui.pressKey('tab').exec();
    await aui.pressKey('enter').exec();
    // wake up the phone 
    await auiAndroid.pressAndroidKey('wakeup').exec()
    // start lastpass app 
    await auiAndroid.execOnShell("monkey -p com.lastpass.authenticator 1").exec()

    await waitUntil(auiAndroid.expect().text().withText('Github').exists().exec())

    const codeElements =
      await auiAndroid
        .get()
        .text()
        .below()
        .text()
        .withText('GitHub')
        .exec();

    // sort the returned elements based on their ymin 
    codeElements.sort((element1, element2) => (element1.bndbox.ymin <= element2.bndbox.ymin ? -1 : 1))
    // Using code[0], so the nearest element is selected
    // strip all non numeric characters from string
    const code = codeElements[0].text.replace(/\D/g, '');
    await aui
      .typeIn(code, { isSecret: true, secretMask: '**' })
      .text().withText("XXXXXX")
      .above()
      .text()
      .withText('Verify')
      .exec();
  }
  );
});


async function waitUntil(askuiCommand: Promise<void>, maxTry = 5) {
  try {
    await askuiCommand
  }
  catch (error) {
    if (maxTry == 0) {
      throw error
    }
    console.log(`Retry predicting command, ${maxTry} tries left`)
    await aui.waitFor(2000).exec()
    await waitUntil(askuiCommand, maxTry - 1)
  }
}
