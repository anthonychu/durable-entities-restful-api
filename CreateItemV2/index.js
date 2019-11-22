const df = require('durable-functions');
const uuid = require('uuid/v4');

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const item = req.body;
    item.id = uuid();
    const action = {
        item,
        operationName: 'create'
    };

    const instanceId = await client.startNew('ItemEntityOrchestrator', undefined, action);
    const result = await client.waitForCompletionOrCreateCheckStatusResponse(req, instanceId, 10000, 500);
    const operationCompleted = (result.status === 200);

    if (operationCompleted) {
        context.res.status = 201;
        context.res.body = item;
    } else {
        context.res.status = 202;
    }
    context.res.headers.location = `/v2/api/items/${item.id}`;
};