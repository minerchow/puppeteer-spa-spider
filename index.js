const puppeteer = require('puppeteer');
const koa = require('koa');
const app = new koa();

let browser;

app.use(async ctx=>{
  const { request: { header: { uri, server } } } = ctx;
  if(!browser){
    browser = await puppeteer.launch({
      headless: true,//无头模式,即不显示浏览器
      ignoreHTTPSErrors: true,//忽略https错误
      devtools: false,//不自动打开控制台（浏览器显示时有效）
    });
  }
  const page = await browser.newPage();
  console.log("server",server);
  console.log("uri",uri)
  
  await page.goto('https://juejin.cn'+uri,{
    waitUntil: ['load', 'networkidle0']//页面加载完并且500ms内没有请求发出判断页面渲染完毕
  });
  const html = await page.content();
  page.close();
 // console.log(html)
  ctx.response.body = html;
})

app.listen(3000);
console.log('服务启动');