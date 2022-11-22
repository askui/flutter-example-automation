# 2 Factor Authentication with GitHub Example

This tutorial will guide you through the 2 Factor authentication workflow on Github.
It shows you how you can automate a Cross-Application + Cross-Device workflow. 

## Prerequisites

> * External computer with a browser
> * External Android device connected with your Android Development Bridge (ADB)
> * External Android device with LastPass Authenticator App
> * Enable the permission to take screenshots in the Authenticator App
> * Github Account with 2 Factor Authentication enabled with the Authenticator App
> * The English language configured and set on your computer devices
> * Start the ui controller for the desktop with the port `7007` and the android device with the port `6769`.

## Disclaimer and Warning

:warning: For demo purposes only!!! This is inherently unsafe as the credentials for your GitHub Account are stored as plain text in the test case!

## Setup

### File _helper/jest.setup.ts_

Replace your `<your workspace id>` and your `<your access token>` in the `UiControlClient` with your workspace id and your access token.

💡 askui credentials

> You can get your askui credential from the [askui user portal](https://app.askui.com/) for free.

### Download Your Platform Specific UiController

Run the following command to download your platform specific UiController:

```bash
npm run annotate_interactively
```

### Copy _helper/jest.setup.the.real.one.ts_ to _helper/jest.setup.ts_

The original `helper/jest.setup.ts` helps you to download your platform specific UiController.
For the 2-Factor-Authentication you need to manually start two UiController instances.
The file _helper/jest.setup.the.real.one.ts_ contains the correct configuration.

Replace your `<your workspace id>` and your `<your access token>` in the `UiControlClient` instances with your workspace id and your access token.

> You can get your askui credential from the [askui user portal](https://app.askui.com/) for free.

### File _my-first-askui-test-suite.ts_

. Replace `<Username>` with your GitHub username
. Replace `<Password>` with your GitHub password

### Connect One UiController Manually to the Android Device

```bash
cd <YOUR_PROJECT_DIRECTORY>/node_modules/askui/dist/release/latest/<YOUR_PLATFORM>
./askui-ui-controller -r android -p 6769

# for example, Mac OS
cd node_modules/askui/dist/release/latest/darwin/askui-ui-controller.app/Contents/MacOS/
./askui-ui-controller -r android -p 6769
```

Select the Android device when asked for a screen.

### Connect The Other UiController to Your Device

```bash
cd <YOUR_PROJECT_DIRECTORY>/node_modules/askui/dist/release/latest/<YOUR_PLATFORM>
./askui-ui-controller -p 7007

# for example, Mac OS
cd node_modules/askui/dist/release/latest/darwin/askui-ui-controller.app/Contents/MacOS/
./askui-ui-controller -p 7007
```

Select the screen you want to use on your device.

### Run

Run the following command to start the automation:

```bash
npm run test
```
