import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
  xit('should click on text', async () => {


    await aui.annotate()
  }
  );
  it('should click on text', async () => {
    await aui.pressAndroidKey('wakeup').exec()
    await aui.execOnShell("monkey -p com.cilabs.conf.websummit 1").exec()
    await aui.click().icon().withText("search").exec()
    await aui.click().icon().withText("search").above().text().withText("People").exec()



    await aui.type("'Maximillian wessendorfe'").exec()



    const messageIcon = await aui.get().icon().withText("comment").exec()
    messageIcon.sort((element1, element2) => (element1.bndbox.ymin <= element2.bndbox.ymin ? -1 : 1))
    const postions = messageIcon.map((icon) => { return [icon.bndbox.xmax - icon.bndbox.get_width() / 2, icon.bndbox.ymax - icon.bndbox.get_height() / 2] })
    await aui.moveMouse(Math.round(postions[0][0]), Math.round(postions[0][1])).exec()
    await aui.mouseLeftClick().exec()
    await aui.typeIn("Hey, thanks for coming by our booth. Let s connect after the conference for a personalized demo.  https://calendly.com/jonas-menesklou/askui").text().withText("Start typing").exec()
    await aui.click().customElement({ 'customImage': 'index.png' }).exec()
    await aui.pressAndroidKey('back').exec()
    await aui.pressAndroidKey('back').exec()
    await aui.annotate()
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
