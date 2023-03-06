import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
    it('annotate', async () => {
        await aui.annotateInteractively();
    });

    it('should fill up the textfields and push buttons', async () => {
        await aui.click().button().withText('reset').exec();
        await aui.waitFor(2000).exec();
        
        // click on the textfield and type characters
        // repeat this as many times as the textfields
        await aui.click().text().withTextRegex('nter[\\s]{0,1}your[\\s]{0,1}usernam').exec();
        await aui.waitFor(1000).exec();
        await aui.type('askui').exec();
        await aui.pressAndroidKey("back").exec();

        await aui.click().text().withTextRegex('nter[\\s]{0,1}your[\\s]{0,1}emai').exec();
        await aui.waitFor(1000).exec();
        await aui.type('johannes.dienst@askui.com').exec();
        await aui.pressAndroidKey("back").exec();
        
        // Click and type the address
        await aui.click().text().withTextRegex('nter[\\s]{0,1}your[\\s]{0,1}addres').exec();
        await aui.waitFor(1000).exec();
        await aui.type('Emmy-Noether-Strasse 17').exec();
        await aui.pressAndroidKey("back").exec();

        // Pressing enter is the equivalent to pressing the return button on the on-screen-keyboard
        // This gets rid of the focus from the textfield
        await aui.pressAndroidKey('enter').exec();
        
        // Press the 'Submit' button
        await aui.click().button().withText('Submit').exec();
        
        // We will have a popup window that has two buttons. Press the 'Refuse' button
        await aui.click().text().withText('Refuse').exec();

        // Here we press multiple toggle buttons one by one
        await aui.click().text().withText('Banana').exec();
        await aui.click().text().withText('Mango').exec();
        await aui.click().text().withText('Sunny').exec();
        await aui.click().text().withText('Rainy').exec();
        await aui.click().text().withText('Windy').exec();
        
        // Fuzzy
        await aui.click().button().withText('Submit').exec();
        await aui.click().text().withText('Refuse').exec();
        
        await aui.moveMouseRelativelyTo(0, 100).text().withText("Windy").exec();
        await aui.mouseToggleDown().exec();
        await aui.moveMouseRelatively(-1500, 0).exec();
        await aui.mouseToggleUp().exec();
    });


    xit('should pick the dates', async () => {
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

    xit('should take a picture', async ()=>{
        // Click on the button 'Take a Picture', then it will launch the camera
        await aui.click().button().contains().text().withText('Take a Picture').exec();
        // Notice how we select the record button.
        // Our demo-app intends to have the record button in a circular shape.
        // So we can look for an icon which is a 'circle'
        // It might be different in other applications.
        await aui.click().icon().containsText('circle').exec();
    });
});

