const proxy = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        proxy('/', {
            target: 'http://localhost:3000/', //서버의 도메인
            changeOrigin: true,
        })
    )
}