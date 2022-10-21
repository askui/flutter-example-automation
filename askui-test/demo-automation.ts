import { aui } from './helper/jest.setup';

describe('jest with askui', () => {
    xit('annotate', async () => {
        await aui.annotateInteractively();
    });

    it('should fill up the textfields and push buttons', async () => {
        await aui.click().text().withText('Enter your username').exec();
        await aui.type('askui').exec();
        await aui.click().text().withText('Enter your email').exec();
        await aui.type('askui@askui.com').exec();
        await aui.execOnShell('input swipe 300 600 300 100').exec();
        await aui.click().text().withText('Enter your address').exec();
        await aui.type('Wilhelmstraße 19').exec();
        await aui.click().button().contains().text().withText('Submit').exec();
        await aui.click().text().withText('Refuse').exec();
        await aui.pressAndroidKey('enter').exec();
        await aui.execOnShell('input swipe 300 600 300 100').exec();
        

        await aui.click().text().withText('Banana').exec();
        await aui.click().text().withText('Mango').exec();
        await aui.click().text().withText('Sunny').exec();
        await aui.click().text().withText('Rainy').exec();
        await aui.click().text().withText('Windy').exec();

        await aui.execOnShell('input swipe 1500 600 300 600').exec();
        await aui.execOnShell('input swipe 1500 600 300 600').exec();
        


    });


    it('should pick the dates', async () => {

        await aui.click().text().withText('Title').exec();
        await aui.type('My vacation plan').exec();
        await aui.execOnShell('input swipe 300 600 300 300').exec();
        await aui.click().text().withText('Description').exec();
        await aui.type('0. Drink a lot of water').exec();
        await aui.pressAndroidKey('tab').exec();

        await aui.execOnShell('input swipe 300 600 300 200').exec();
        


        // Pick a date
        // Depature date
        await aui.click().text().withText('edit').nearestTo().text().withText('Depature').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().text().withText('20').exec();
        await aui.click().text().withText('ok').exec();

        // Return date
        await aui.click().text().withText('edit').nearestTo().text().withText('Return').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().icon().withText('chevron right').exec();
        await aui.click().text().withText('5').exec();
        await aui.click().text().withText('ok').exec();

        await aui.execOnShell('input swipe 300 600 300 200').exec();

        await aui.click().checkboxUnchecked().nearestTo().text().withText('Brushed Teeth').exec();
        await aui.click().switchDisabled().nearestTo().text().withText('Enable feature').exec();

        await aui.execOnShell('input swipe 1500 600 300 600').exec();

    });

    it('should take a picture', async ()=>{
        await aui.click().button().contains().text().withText('Take a Picture').exec();
        await aui.click().button().contains().text().withText('Take a Picture').exec();
        await aui.click().icon().containsText('circle').exec();
    });
});

