# Askui Automation Example with Flutter
This repository contains examples of using [askui](https://www.askui.com/) to automate an android app built with [Flutter](https://flutter.dev/). To run the example, set up the provided demo app by following the instructions. This example assumes that you already have the [Android Emulator](https://developer.android.com/studio/run/emulator) installed.

Available examples include:
- Click/Touch automation
- Type automation
- Swipe automation

#### Live Demo in Action (playback speed x3)
![live-demo.gif](images/inaction-fast.gif)


## Setup

### 1. Setup Flutter demo app
1. [Install Flutter](https://docs.flutter.dev/get-started/install)
2. Clone this repository and run `flutter create demo_app` within the directory:
```bash
git clone https://github.com/askui/flutter-example-automation
cd flutter-example-automation
flutter create demo_app
cd demo_app
```
3. Install dependencies for the Flutter demo app:
```bash
# run this command inside the flutter project directory `demo_app/`
flutter pub add camera intl
```
4. In order to use the camera, we need to set the `minSdkVersion` in `android/app/build.gradle`:
```groovy
// inside the 'android/app/build.gradle' set the 'minSdkVersion' to 21
    defaultConfig {
        ...
        minSdkVersion 21
        ...
    }
```
5. (optional) The app is ready to be built, but it will throw deprecation warnings. If you want to clear the deprecation warnings, follow this step. [See this issue](https://github.com/flutter/flutter/issues/89578#issuecomment-945916643)
```yaml
# change the respective part inside the 'pubspec.yaml'
dependencies:
  camera:
    git:
      url: https://github.com/flutter/plugins
      path: packages/camera/camera
      ref: 9e46048ad2e1f085c1e8f6c77391fa52025e681f
```

6. [Run the Android Emulator](https://developer.android.com/studio/run/emulator)

7. Run the demo app:
 ```bash
flutter run
 ```

Now you should see the demo app running on your android device.


### 2. Setup ADBKeyboard
In this example, we are going to automate the typing in the android device. In order to let askui fluently type as desired, we will use a virtual keyboard that handles the keyboard input via adb: [ADBKeyboard.apk](https://github.com/senzhk/ADBKeyBoard)

1. Download the ADB-Keyboard package *(Important: Version 2.0)*: <br>[Link to Github Repo](https://github.com/senzhk/ADBKeyBoard/releases/tag/v2.0)
2. Unzip it.
3. Find your device:
```bash
# make sure that your android device is connected, and the USB debugging mode is enabled.
adb devices
```
4. Install the ADBkeyboard on the device:
```bash
# inside ADBKeyBoard-2.0/
adb -s <your device id> install ADBKeyboard.apk
```
5. Configure the ADB Keyboard:
```bash
# inside ADBKeyBoard-2.0/
adb -s <your device id> shell settings put secure default_input_method com.android.adbkeyboard/.AdbIME
```
6. Enable the ADB Keyboard:
```bash
# inside ADBKeyBoard-2.0/
adb -s <your device id> shell ime enable com.android.adbkeyboard/.AdbIME
```
7. To check if it is enabled: <br>Click on a textfield in an app and see if the `ADB Keyboard {ON}` notification is shown at the bottom of the screen.


### 3. Setup askui
1. Setup askui by following the [Getting Started Guide](https://docs.askui.com/docs/general/Getting%20Started/getting-started).
2. We need to run the UiController directly with an extra argument to specify the runtime mode, as the current version of askui(ver. 0.4) doesn't provide the api for running it with the runtime argument yet.
From within your npm project path, go to the directory that contains the askui-ui-controller binary, and run `./askui-ui-controller -r android`
```bash
cd <YOUR_PROJECT_DIRECTORY>/node_modules/askui/dist/release/latest/<YOUR_PLATFORM>
./askui-ui-controller -r android

# for example, Mac OS
cd node_modules/askui/dist/release/latest/darwin/askui-ui-controller.app/Contents/MacOS/
./askui-ui-controller -r android

# If you can't find the binary as described above,
# then you might have askui freshly installed and haven't run it yet.
# The binary gets downloaded as the askui test code runs.
# Run the command below to run the askui test code:
npx jest test/my-first-askui-test-suite.test.ts --config ./test/jest.config.ts
```

3. If you got them both(emulator and UiController) running, then we are ready to go for the UI automation.
If you are working with the test code from our [official docs](https://docs.askui.com/docs/general/Getting%20Started/writing-your-first-test/), then you need to deactivate a few lines of the code in `test/helper/jest.setup.ts` that is running the UiController, because we are already running it manually in the previous step.
```ts
// file location: test/helper/jest.setup.ts
// comment out every line that uses uiController

import { UiControlClient, UiController } from 'askui';

// uiController: UiController;

let aui: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {
//   uiController = new UiController({
//     /**
//      * Select the display you want to run your tests on, display 0 is your main display;
//      * ignore if you have only one display
//      */
//     display: 0,
//   });

//   await uiController.start();

  aui = await UiControlClient.build({
    credentials:{
        workspaceId: 'YOUR_WORKSPACEID_FROM_USER_PORTAL',
        token: 'YOUR_TOKEN_FROM_USER_PORTAL',
    }
  });

  await aui.connect();
});

afterAll(async () => {
//   await uiController.stop();

  aui.close();
});

export { aui };
```
4. Use the test code `askui-test/demo-automation.ts` provided in this repository.
5. Run the askui test code:
```bash
npx jest test/my-first-askui-test-suite.test.ts --config ./test/jest.config.ts;
```

--------
## Breaking Down the Askui Test Code 

This chapter will walk you through the provided `askui-test/demo-automation.ts` step by step.
The test is divided into three parts, and each test is run for each tabs within the demo app:
- Outline tab
    - Find a textfield and type in characters.
    - Find a button and press it.
- Datepicker tab
    - Select a desired date within the date picker widget.
- Camera tab
    - Open the camera and push the record button.

##### General tips for using askui as a more friendly tool:
1. **Try to annotate** : Use `await aui.annotateInteractively();` or `await aui.annotate();` in order to see how askui is understanding the visible elements on your screen. By using `await aui.annotate()`, the result of the annotation will be saved in `report/` as an HTML file.
2. **Be aware of the screen size of your device** : askui understands your application based on the screen shown and captured. Therefore, in some occasions, you may want to know your screen size in order to e.g. properly scroll or swipe within your application. You may need to change the numbers for the `input swipe` command within the provided test code, so that it suits the screen size of your device.

    - *tip: If you are using a device with a bigger screen e.g. Tablet, then the screen of your test device (real android device or emulator) might be big enough to see the whole page without scrolling.*
3. **Try to select the elements by its text**


### 1. Click and Type
The test code is within the `askui-test/demo-automation.ts`. Copy and paste the code into your askui test code.
- We start the test automation from the very first tab of our demo-app.
![demo-first-tab](images/demo-first-tab.jpeg)

*image: First tab of the demo-app*
- In order to type into a textfield, we first need to get the focus on the desired textfield. We can achieve it by running the code below:
```ts
        // click on the textfield and type characters
        // repeat this as many times as the textfields
        await aui.click().text().withText('Enter your username').exec();
        await aui.type('askui').exec();
```

- As we have multiple of textfields in our demo app, we can iterate the same procedure for each of them.
Notice that we have to scroll down the page before we can see the next textfield:
```ts
        // click on the textfield and type characters
        // repeat this as many times as the textfields
        await aui.click().text().withText('Enter your username').exec();
        await aui.type('askui').exec();
        await aui.click().text().withText('Enter your email').exec();
        await aui.type('askui@askui.com').exec();
        // Click and type the address
        await aui.click().text().withText('Enter your address').exec();
        await aui.type('Haid-und-Neu-Straße 18').exec();
        // Pressing enter is the equivelant to pressing the return button on the on-screen-keyboard
        // This gets rid of the focus from the textfield
        await aui.pressAndroidKey('enter').exec();
```

***Trouble shooting**: If the scrolling test fails, then try to adjust the numbers of the `input swipe` command. Each number represents x, y coordinate of where to swipe on the screen, and it must be positioned within **scrollable area**.*
- After filling up the textfields, we can push the buttons at the bottom of the page:
```ts
        // Press the 'Submit' button
        await aui.click().text().withText('Submit').exec();
        // We will have a popup window that has two buttons. Press the 'Refuse' button
        await aui.click().text().withText('Refuse').exec();
        // Here we press multiple of toggle buttons one by one
        await aui.click().text().withText('Banana').exec();
        await aui.click().text().withText('Mango').exec();
        await aui.click().text().withText('Sunny').exec();
        await aui.click().text().withText('Rainy').exec();
        await aui.click().text().withText('Windy').exec();
        // Attention for swiping!
        /*  Swipe/scroll within the page
            - execOnShell() can run shell commands within the device via adb.
            - Note that, you have to adjust the four numeric parameters,
              in order to make it fit to your device's screen.
            - The syntax is:
                input swipe <startX> <startY> <endX> <endY>
            - Depending on the screen size of your device,
              the coordinates should stay within the scrollable/swipeable area of the app.
              i.e. the 'Tabbar' at the top of the demo app is not scrollable.
        */
        // Here we swipe the page two times in a row
        await aui.execOnShell('input swipe 1000 1000 100 1000').exec();
        await aui.execOnShell('input swipe 1000 1000 100 1000').exec();
```

### 2. Datepicker
- After running the test code above, we should see the demo app swiped to the `Datepicker` tab.
![demo-second-tab](images/demo-second-tab.jpeg)

*image: Datepicker tab of the demo app*

- First, we scroll the page down in order to see the date picker widget:
```ts
        // First, we type in the desired values into the textfields.
        await aui.click().text().withText('Title').exec();
        await aui.type('My vacation plan').exec();
        await aui.click().text().withText('Description').exec();
        await aui.type('0. Drink a lot of water').exec();
        await aui.pressAndroidKey('tab').exec();
```

- After running the test code above, we should see two different date picker widgets that are represented with `edit` buttons:

```ts
        // Second, we select a desired date from the Datepicker widget.
        // Notice how we select the icon 'chevron right/left' to shift the calendar month.
        await aui.click().text().withText('edit').nearestTo().text().withText('Depature').exec(); // this will open up the calendar
        await aui.click().icon().withText('chevron right').exec(); // within the calendar, we push the > icon on the top right corner
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().text().withText('7').exec(); // select 7
        await aui.click().text().withText('ok').exec(); // then, press OK
        // Repeat the step for the next Datepicker widget.
        await aui.click().text().withText('edit').nearestTo().text().withText('Return').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().text().withText('5').exec();
        await aui.click().text().withText('ok').exec();
```

- Let's go further below to the bottom of the page, and then interact with more interfaces:
```ts
        // click and check the checkbox
        await aui.click().checkboxUnchecked().nearestTo().text().withText('Brushed Teeth').exec();
        // finally, we turn on the switch
        await aui.click().switchDisabled().nearestTo().text().withText('Enable feature').exec();
        // Swipe the page to the Camera tab
        await aui.execOnShell('input swipe 1000 1000 100 1000').exec();
```

### 3. Take a picture with the camera
- In the final tab `Camera`, we can launch the device's camera and take a picture by pressing the record button.
![Camera-tab](images/demo-third-tab.jpeg)

*image: Camera tab of the demo app*
```ts
        // Click on the button 'Take a Picture', then it will launch the camera
        await aui.click().button().contains().text().withText('Take a Picture').exec();
        // Notice how we select the record button.
        // Our demo-app intends to have the record button in a circular shape.
        // So we can look for an icon which is a 'circle'
        // It might be different in other applications.
        await aui.click().icon().containsText('circle').exec();
```

### 4. Complete test code
This is the complete test code that runs askui to automate our test:
```ts
import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
    xit('annotate', async () => {
        await aui.annotateInteractively();
    });

    it('should fill up the textfields and push buttons', async () => {
        // click on the textfield and type characters
        // repeat this as many times as the textfields
        await aui.click().text().withText('Enter your username').exec();
        await aui.type('askui').exec();
        await aui.click().text().withText('Enter your email').exec();
        await aui.type('askui@askui.com').exec();
        // Click and type the address
        await aui.click().text().withText('Enter your address').exec();
        await aui.type('Haid-und-Neu-Straße 18').exec();
        // Pressing enter is the equivelant to pressing the return button on the on-screen-keyboard
        // This gets rid of the focus from the textfield
        await aui.pressAndroidKey('enter').exec();
        // Press the 'Submit' button
        await aui.click().text().withText('Submit').exec();
        // We will have a popup window that has two buttons. Press the 'Refuse' button
        await aui.click().text().withText('Refuse').exec();
        // Here we press multiple of toggle buttons one by one
        await aui.click().text().withText('Banana').exec();
        await aui.click().text().withText('Mango').exec();
        await aui.click().text().withText('Sunny').exec();
        await aui.click().text().withText('Rainy').exec();
        await aui.click().text().withText('Windy').exec();
        // Attention for swiping!
        /*  Swipe/scroll within the page
            - execOnShell() can run shell commands within the device via adb.
            - Note that, you have to adjust the four numeric parameters,
              in order to make it fit to your device's screen.
            - The syntax is:
                input swipe <startX> <startY> <endX> <endY>
            - Depending on the screen size of your device,
              the coordinates should stay within the scrollable/swipeable area of the app.
              i.e. the 'Tabbar' at the top of the demo app is not scrollable.
        */
        // Here we swipe the page two times in a row
        await aui.execOnShell('input swipe 1000 1000 100 1000').exec();
        await aui.execOnShell('input swipe 1000 1000 100 1000').exec();
    });


    it('should pick the dates', async () => {
        // First, we type in the desired values into the textfields.
        await aui.click().text().withText('Title').exec();
        await aui.type('My vacation plan').exec();
        await aui.click().text().withText('Description').exec();
        await aui.type('0. Drink a lot of water').exec();
        await aui.pressAndroidKey('tab').exec();
        // Second, we select a desired date from the Datepicker widget.
        // Notice how we select the icon 'chevron right/left' to shift the calendar month.
        await aui.click().text().withText('edit').nearestTo().text().withText('Depature').exec(); // this will open up the calendar
        await aui.click().icon().withText('chevron right').exec(); // within the calendar, we push the > icon on the top right corner
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().text().withText('7').exec(); // select 7
        await aui.click().text().withText('ok').exec(); // then, press OK
        // Repeat the step for the next Datepicker widget.
        await aui.click().text().withText('edit').nearestTo().text().withText('Return').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().text().withText('5').exec();
        await aui.click().text().withText('ok').exec();
        // click and check the checkbox
        await aui.click().checkboxUnchecked().nearestTo().text().withText('Brushed Teeth').exec();
        // finally, we turn on the switch
        await aui.click().switchDisabled().nearestTo().text().withText('Enable feature').exec();
        // Swipe the page to the Camera tab
        await aui.execOnShell('input swipe 1000 1000 100 1000').exec();
    
    });

    it('should take a picture', async ()=>{
        // Click on the button 'Take a Picture', then it will launch the camera
        await aui.click().button().contains().text().withText('Take a Picture').exec();
        // Notice how we select the record button.
        // Our demo-app intends to have the record button in a circular shape.
        // So we can look for an icon which is a 'circle'
        // It might be different in other applications.
        await aui.click().icon().containsText('circle').exec();
    });
});
```