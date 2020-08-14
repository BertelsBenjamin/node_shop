const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars'); // Only necessary for handlebars

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//app.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout:'main-layout', extname: 'hbs'})) // Only necessary for handlebars
//app.set('view engine', 'pug');
app.set('view engine', 'ejs')
app.set('views', 'views'); // unnecessary since default setting


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle:'Page not found'});
})

const server = http.createServer(app);

server.listen(3000, 'localhost');