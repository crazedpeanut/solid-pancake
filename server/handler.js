'use strict';

console.log('Loading function');

const doc = require('dynamodb-doc');

const dynamo = new doc.DynamoDB();

const aws = require('aws-sdk');
const ses = new aws.SES({
    region: 'us-east-1'
});

module.exports.pubs = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
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
    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => {

        const response = {
            statusCode: err ? '400' : '200',
            body: err ? err.message : JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
            },
        };

        console.log(response)

        callback(null,response);
    }

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
            let post_data;

            try {
                post_data = JSON.parse(event.body);
            } catch(err) {
                done(err);
            }

            var params = {
                TableName: 'pubcrawls',
                Item:  post_data
            };

            dynamo.putItem(params, done);
            break;
        case 'PUT':
            dynamo.updateItem(JSON.parse(event.body), done);
            break;
        case 'OPTIONS':
            done();
            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};

module.exports.sendemail = (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        },
    });

    switch (event.httpMethod) {
        case 'GET':

            var eParams = {
                Destination: {
                    ToAddresses: ["shaun@theshaun.com"]
                },
                Message: {
                    Body: {
                        Text: {
                            Data: "Hey! What is up?"
                        }
                    },
                    Subject: {
                        Data: "Email Subject!!!"
                    }
                },
                Source: "no-reply@thepub.tech"
            };

            console.log('===SENDING EMAIL===');
            var email = ses.sendEmail(eParams, function(err, data){
                if(err) console.log(err);
                else {
                    console.log("===EMAIL SENT===");
                    console.log(data);


                    console.log("EMAIL CODE END");
                    console.log('EMAIL: ', email);
                    context.succeed(event);

                }
            });


            break;


        case 'POST':


            break;
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
};