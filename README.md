# puppeteer-spa-spider
## spa项目 利用puppeteer爬虫生成html页面解决seo问题
### nginx
```
server{
    listen 80;
    server_name www.test.com;
    location / {
        root   D:/nginx-1.17.1/html/dist; #前端代码存放地址
        index  index.html;
        try_files $uri /index.html;#brower或者history路由需要设置此项，功能是如果找不到目录文件，使用根目录的index.html文件
        proxy_set_header    X-Real-IP        $remote_addr;
        proxy_set_header    uri              $request_uri;#转发需要的路径参数
        proxy_set_header    server           $server_name;#转发服务器名
        if ($http_user_agent ~* "qihoobot|Baiduspider|Googlebot|Googlebot-Mobile|Googlebot-Image|Mediapartners-Google|Adsbot-Google|Feedfetcher-Google|Yahoo! Slurp|Yahoo! Slurp China|YoudaoBot|Sosospider|Sogou spider|Sogou web spider|MSNBot|ia_archiver|Tomato Bot|FeedDemon|JikeSpider|Indy Library|Alexa Toolbar|AskTbFXTV|AhrefsBot|CrawlDaddy|CoolpadWebkit|Java|Feedly|UniversalFeedParser|ApacheBench|Microsoft URL Control|Swiftbot|ZmEu|oBot|jaunty|Python-urllib|lightDeckReports Bot|YYSpider|DigExt|YisouSpider|HttpClient|MJ12bot|heritrix|EasouSpider|Ezooms|^$")
        {#判断如果是网络爬虫，转发到node服务器下
            proxy_pass http://www.test.com:3000; #node 爬虫所请求的路由  
            break;
        }
    }
}
```