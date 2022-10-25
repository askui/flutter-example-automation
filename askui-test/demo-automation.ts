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
        // Attention for scrolling!
        /*  Scroll down the page
            - execOnShell() can run shell commands within the device via adb.
            - Note that, you have to adjust the four numeric parameters,
              in order to make it fit to your device's screen.
            - The syntax is:
                input swipe <startX> <startY> <endX> <endY>
            - Depending on the screen size of your device,
              the coordinates should stay within the scrollable area of the app.
              i.e. the 'Tabbar' at the top of the demo app is not scrollable.
        */
        await aui.execOnShell('input swipe 300 600 300 100').exec();
        // Click and type the address
        await aui.click().text().withText('Enter your address').exec();
        await aui.type('Haid-und-Neu-Straße 18').exec();
        // Pressing enter is the equivelant to pressing the return button on the on-screen-keyboard
        // This gets rid of the focus from the textfield
        await aui.pressAndroidKey('enter').exec();
        // Press the 'Submit' button
        await aui.click().button().contains().text().withText('Submit').exec();
        // We will have a popup window that has two buttons. Press the 'Refuse' button
        await aui.click().text().withText('Refuse').exec();
        // We scroll down further in order to see more buttons
        // Again, if this scrolling doesn't work for you, try to adjust the numbers
        // Also note that, you don't need to scroll if your device is big enough to
        // show the whole page at once
        await aui.execOnShell('input swipe 300 600 300 100').exec();
        // Here we press multiple of toggle buttons one by one
        await aui.click().text().withText('Banana').exec();
        await aui.click().text().withText('Mango').exec();
        await aui.click().text().withText('Sunny').exec();
        await aui.click().text().withText('Rainy').exec();
        await aui.click().text().withText('Windy').exec();
        // We swipe the tab horizontally.
        // Make sure that you use the proper numbers for your screen.
        await aui.execOnShell('input swipe 1500 600 300 600').exec();
        await aui.execOnShell('input swipe 1500 600 300 600').exec();
    });


    it('should pick the dates', async () => {
        // First, we type in the desired values into the textfields.
        await aui.click().text().withText('Title').exec();
        await aui.type('My vacation plan').exec();
        // Again, if this scrolling doesn't work for you, try to adjust the numbers
        // Also note that you don't need to scroll if your device is big enough to
        // show the whole page at once
        await aui.execOnShell('input swipe 300 600 300 300').exec();
        await aui.click().text().withText('Description').exec();
        await aui.type('0. Drink a lot of water').exec();
        await aui.pressAndroidKey('tab').exec();
        // Here we scroll the page in order to see the date picker.
        // Again, if this scrolling doesn't work for you, try to adjust the numbers
        // Also note that, you don't need to scroll if your device is big enough to
        // show the whole page at once
        await aui.execOnShell('input swipe 300 600 300 200').exec();
    
        // Second, we select a desired date from the Datepicker widget.
        // Notice how we select the icon 'chevron right/left' to shift the calendar month.
        await aui.click().text().withText('edit').nearestTo().text().withText('Depature').exec(); // this will open up the calendar
        await aui.click().icon().withText('chevron right').exec(); // within the calendar, we push the > icon on the top right corner
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().text().withText('20').exec(); // select 20
        await aui.click().text().withText('ok').exec(); // then, press OK
        // Repeat the step for the next Datepicker widget.
        await aui.click().text().withText('edit').nearestTo().text().withText('Return').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().text().withText('5').exec();
        await aui.click().text().withText('ok').exec();
        // We scroll further down, and again, make sure whether your device needs to scroll. 
        await aui.execOnShell('input swipe 300 600 300 200').exec();
        // click and check the checkbox
        await aui.click().checkboxUnchecked().nearestTo().text().withText('Brushed Teeth').exec();
        // finally, we turn on the switch
        await aui.click().switchDisabled().nearestTo().text().withText('Enable feature').exec();
        // after that, we move to the next tab by swiping
        await aui.execOnShell('input swipe 1500 600 300 600').exec();
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

