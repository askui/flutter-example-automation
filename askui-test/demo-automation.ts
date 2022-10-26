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

