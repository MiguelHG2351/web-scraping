const puppeter = require("puppeteer");
const fs = require('fs')

async function getData() {
    const browser = await puppeter.launch()
    const pages = await browser.newPage()
    await pages.goto('https://www.nasa.gov/');
    await pages.screenshot({
        fullPage: true,
        path: "screeenshot.png"
    })
    const data = await pages.evaluate(() => { //
        const datas = []
        // const $reviews = document.querySelectorAll('.style-scope .ytd-comment-renderer') // id = content-text
        // const $users = document.querySelector('.sc-AxhUy').textContent
        const $users = document.querySelectorAll('.headline')
        const $images = document.querySelectorAll(".bg-card-canvas");
        // const $pagination = document.querySelectorAll('.Pagination .Pagination-number')style-scope ytd-comment-renderer
        // const $contenido = document.querySelectorAll('yt-formatted-string style-scope ytd-formatted-string')
        // const totalPages = Number($pagination[$pagination.length -1].textContent.trim())
        // const photoUsers = document.querySelectorAll("style-scope yt-img-shadow")
        $users.forEach((element, index) => {
            datas.push({
                text: element.textContent.trim(),
                image: $images[index].style.backgroundImage.slice(5, -1)
            })
        });
        return datas
        
    })
    
    fs.writeFile('data.js', `export default ${JSON.stringify(data)}`, () => {
        console.log('data writed')
      })
    // console.log(data)
    // await browser.close()
}

getData()