var mongo = require('mongodb'),
    errors = require('./errors'),
    MongoClient = require('mongodb').MongoClient,
    DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/api',
    db,
    DB_TABLE = 'items',
    ObjectID = mongo.ObjectID;

exports.setTable = function (table) {
    DB_TABLE = table;
};

exports.connect = function () {
    MongoClient.connect(DB_URL, function (err, database) {
        if (err) {
            throw new Error(err);
        }
        db = database;
        console.log('Connected to MongoDB for ' + DB_TABLE);
        db.collection(DB_TABLE, {strict: true}, function (err, collection) {
            if (err) {
                console.log('The ' + DB_TABLE + ' collection doesn’t exist. Add some data.');
            }
        });
    });
};

exports.about = function (req, res) {
    res.status(200).send({'success': {'statusCode': 200, 'message': 'App is up and running'}});
};

exports.findAll = function (req, res) {
    console.log('Listing documents');
    db.collection(DB_TABLE, function (err, collection) {
        if (err) {
            err = errors.formatError(err);
            console.log('Error: ' + err);
            res.status(500).send({'error': {'statusCode': 500, 'message': err}});
        }
        collection.find().toArray(function (err, items) {
            if (err) {
                err = errors.formatError(err);
                console.log('Error: ' + err);
                res.status(500).send({'error': {'statusCode': 500, 'message': err}});
            }
            res.send(items);
        });
    });
};

exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving document by id: ' + id);
    db.collection(DB_TABLE, function (err, collection) {
        if (err) {
            err = errors.formatError(err);
            console.log('Error: ' + err);
            res.status(500).send({'error': {'statusCode': 500, 'message': err}});
        }
        collection.findOne({'_id': new ObjectID(id)}, function (err, item) {
            if (err) {
                err = errors.formatError(err);
                console.log('Error: ' + err);
                res.status(500).send({'error': {'statusCode': 500, 'message': err}});
            }
            if (item) {
                res.send(item);
            } else {
                console.log('Error: Not found');
                res.status(404).send({'error': {'statusCode': 404, 'message': 'Not found'}});
            }
        });
    });
};

exports.add = function (req, res) {
    var body = req.body;
    console.log('Adding document: ' + JSON.stringify(body));
    db.collection(DB_TABLE, function (err, collection) {
        if (err) {
            err = errors.formatError(err);
            console.log('Error: ' + err);
            res.status(500).send({'error': {'statusCode': 500, 'message': err}});
        }
        collection.insert(body, {safe: true}, function (err, result) {
            if (err) {
                err = errors.formatError(err);
                console.log('Error: ' + err);
                res.status(500).send({'error': {'statusCode': 500, 'message': err}});
            } else {
                console.log('Success: ' + JSON.stringify(result.ops[0]));
                res.send(result.ops[0]);
            }
        });
    });
};

exports.update = function (req, res) {
    var id = req.params.id,
        body = req.body;
    console.log('Updating document: ' + id);
    db.collection(DB_TABLE, function (err, collection) {
        if (err) {
            err = errors.formatError(err);
            console.log('Error: ' + err);
            res.status(500).send({'error': {'statusCode': 500, 'message': err}});
        }
        collection.findAndModify({'_id': new ObjectID(id)}, [], {$set: body}, {safe: true, new: true}, function (err, result) {
            if (err) {
                err = errors.formatError(err);
                console.log('Error: ' + err);
                res.status(500).send({'error': {'statusCode': 500, 'message': err}});
            }
            if (!result.value) {
                console.log('Error: Not found');
                res.status(404).send({'error': {'statusCode': 404, 'message': 'Not found'}});
            } else {
                console.log('Success: ' + JSON.stringify(result.value));
                res.send(result.value);
            }
        });
    });
};

exports.delete = function (req, res) {
    var id = req.params.id;
    console.log('Deleting document: ' + id);
    db.collection(DB_TABLE, function (err, collection) {
        if (err) {
            err = errors.formatError(err);
            console.log('Error: ' + err);
            res.status(500).send({'error': {'statusCode': 500, 'message': err}});
        }
        collection.remove({'_id': new ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                err = errors.formatError(err);
                console.log('Error: ' + err);
                res.status(500).send({'error': {'statusCode': 500, 'message': err}});
            }
            if (!result.result.n) {
                console.log('Error: Not found');
                res.status(404).send({'error': {'statusCode': 404, 'message': 'Not found'}});
            } else {
                console.log('Success: ' + result.result.n + ' document deleted');
                res.send({});
            }
        });
    });
};

