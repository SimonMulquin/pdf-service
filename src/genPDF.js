import uniqid from 'uniqid';

export default async(req, res) => {
    const id = uniqid();

    const page = await browser.newPage();

    await page.setContent("<h1>It works !</h1>")//set with html body
    await page.emulateMedia('screen')
    await page.pdf({
        path: `C:\\Users\\Simon\\Documents\\KalaxTmp\\${id}.pdf`,
        format: 'A4',
        printBackground: true
    })

    page.close()

    res.send(id)
    //try close page not browser
}