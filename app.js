var express = require('express'),

    bodyParser = require('body-parser'),
    compression = require('compression'),
    api = require('./modules/api'),
    documentName = process.env.DOCUMENT_NAME || 'items',
    port = process.env.PORT || 3001,
    v = 'v1',
    app = express(),
    allowCrossDomain = function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    };

api.setTable(documentName);
api.connect(documentName);

app.use(allowCrossDomain);
app.use(compression());
app.use(bodyParser.json());

app.get('/' + v + '/' + documentName, api.findAll);
app.get('/' + v + '/' + documentName + '/:id', api.findById);
app.post('/' + v + '/' + documentName + '', api.add);
app.put('/' + v + '/' + documentName + '/:id', api.update);
app.delete('/' + v + '/' + documentName + '/:id', api.delete);

app.get('/' + v + '/about', api.about);

app.listen(port);
console.log('Listening on port ' + port + '...');