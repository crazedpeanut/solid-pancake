'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();


module.exports.pubs = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
    });

    switch (event.httpMethod) {
        case 'GET':

            dynamo.scan({
                TableName : 'pubs',
                Limit : 550
            }, done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};

module.exports.pubcrawls = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*'
        },
    });

    switch (event.httpMethod) {
        case 'DELETE':
            dynamo.deleteItem(JSON.parse(event.body), done);
            break;
        case 'GET':
            let name = null;

            if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
                if (event.queryStringParameters.name !== undefined && event.queryStringParameters.name !== null && event.queryStringParameters.name !== "") {
                    console.log("Received name: " + event.queryStringParameters.name);
                    name = event.queryStringParameters.name;
                }
            }
            if(name !== null)
            {
                dynamo.getItem({TableName: 'pubcrawls', Key: {'PubCrawlName': name}}, done);
            }
            else
            {
                dynamo.scan({ TableName: 'pubcrawls' }, done);
            }

            break;
        case 'POST':
            var post_data = JSON.parse(event.body);

            var params = {
                TableName: 'pubcrawls',
                Item:  post_data
            };

            dynamo.putItem(params, done);
            break;
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};