// error_reporting(0)
const readlineSync = require('readline-sync');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
var randomName = require('random-pick-name');
const fs = require('fs');
const delay = require('delay');
const randomUseragent = require('random-useragent');
var random_name = require('node-random-name');
 (async () => {
console.log('[+] Auto Register + Get Token')
console.log('[+] Powered Ciluk Ba'+'\n  ')
var link = readlineSync.question('[+] Link Reff : ')
var namefile = readlineSync.question('[+] Save File : ')
console.log('\n')
while(true) {
        var uagent = randomUseragent.getRandom(function (ua) {
            return parseFloat(ua.browserVersion) >= 20;
        });

        const browser = await puppeteer.launch({
            executablePath:'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
            headless:true,
            devtools:false,
        })
        const page = await browser.newPage();
        await page.setUserAgent(uagent);
        await page.setViewport({ width: 350, height: 700});
        await page.goto(`${link}`, {
            waitUntil: 'networkidle0',
          });

        var name1 = random_name({
            first: true
        });
        var name2 = random_name({
            last: true
        });

        var angka = nope(1);

        await page.waitForSelector('#ibu_hotel_container > section > article > div > div.invited-page_main > div.invitee-info > div')
        const submit = await page.$('#ibu_hotel_container > section > article > div > div.invited-page_main > div.invitee-info > div')
        await submit.click()
        
        await page.waitForSelector('#registerContent > div:nth-child(2) > div > div.text-field__main___141SM > div.text-field__inputWrap___1CQw5 > input')
        const email = await page.$('#registerContent > div:nth-child(2) > div > div.text-field__main___141SM > div.text-field__inputWrap___1CQw5 > input')
        await email.type(''+name1+''+name2+''+angka+'@gmail.com')

        await page.waitForSelector('#registerContent > div:nth-child(3) > div > div.text-field__main___141SM > div.text-field__inputWrap___1CQw5 > input')
        const passwd = await page.$('#registerContent > div:nth-child(3) > div > div.text-field__main___141SM > div.text-field__inputWrap___1CQw5 > input')
        await passwd.type('Alfarz123!')

        await page.keyboard.press('F12')

        await delay(2000)
        const daftar = await page.$('#registerContent > div.accounts__registerBtn___350up > div')
        await daftar.click()

        await delay(3000)
        try {
            await page.waitForSelector('#layOut > div.accounts__registerFinish___1YwjC > div.accounts__registerFinishHead___1fLG2 > div.accounts__headCongratulation___1abov', {visible:true, timeout:3000})
            const info = await page.evaluate(() => {
                return document.querySelector('#layOut > div.accounts__registerFinish___1YwjC > div.accounts__registerFinishHead___1fLG2 > div.accounts__headCongratulation___1abov').innerText
            })
            console.log('[+] '+name1+''+name2+''+angka+'@gmail.com : '+info)
            } catch(err) {
                try {
                    const info = await page.evaluate(() => {
                        return document.querySelector('#register-error-tip > div > span').innerText;
                    })
                    console.log('[+]',info)
            // continue;
                } catch (err) {
                console.log('[+] '+name1+''+name2+''+angka+'@gmail.com : Failure Register')
            continue;
                }
                console.log('[+] '+name1+''+name2+''+angka+'@gmail.com : Failure Register')
            continue;
            }

        await page.waitForSelector('#layOut > div.accounts__registerFinish___1YwjC > div.accounts__registerFinishBtn___1oYry > div')
        const button = await page.$('#layOut > div.accounts__registerFinish___1YwjC > div.accounts__registerFinishBtn___1oYry > div')
        await button.click()
        const result = [];

        await delay(3000)
        await page.waitForSelector('#ibu_hotel_container > section > article > div > div.invited-page_main > div.invitee-info.hasLogin > div.invitee-info_btn')
        const lanjut = await page.$('#ibu_hotel_container > section > article > div > div.invited-page_main > div.invitee-info.hasLogin > div.invitee-info_btn')
        await lanjut.click()

        await delay(4000)
        if (page.url().includes('https://tripcom.onelink.me')) {
        fs.appendFileSync(`${namefile}`, page.url() + '\n');
        console.log('[+] Saved Link To '+namefile)
        } else {
        fs.appendFileSync(`${namefile}`, '');
        console.log('[+] Failure Get Link')
        }

        fileBuffer =  fs.readFileSync(namefile);
        to_string = fileBuffer.toString();
        split_lines = to_string.split("\n");
        if (split_lines.length-1 == 10) {
            console.log('[+] Link Confirm Sudah DiKumpulkan')
            process.exit()
        } else {
            console.log('[+] Link Confirm Sedang Proses')
        }
        console.log('\n')
        await browser.close()
    }
})();

function nope(length) {
    var result = '';
    var characters = '12314567890';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}