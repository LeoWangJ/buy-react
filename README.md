安裝與啟動專案

> npm install && npm start

架構

```
|-- .gitignore
    |-- README.md
    |-- package.json
    |-- yarn.lock
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- manifest.json
    |   |-- robots.txt
    |   |-- mock
    |       |-- products
    |           |-- like.json
    |-- src
        |-- index.js
        |-- components  公用組件
        |   |-- Header
        |       |-- index.js
        |-- containers  容器組件
        |   |-- App
        |   |   |-- index.css
        |   |   |-- index.js
        |   |-- Home
        |       |-- index.js
        |       |-- components
        |-- images
        |-- redux  採用鴨子模式
        |   |-- middleware
        |   |-- modules
        |-- utils  共用方法
```
