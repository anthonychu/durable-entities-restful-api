const df = require('durable-functions');

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const item = req.body;
    const id = req.params.id;

    if (item.id !== id) {
        context.res.status = 400;
        context.res.body = 'id and item id do not match';
        return;
    }

    const action = {
        item,
        operationName: 'update'
    };
    const instanceId = await client.startNew('ItemEntityOrchestrator', undefined, action);
    const result = await client.waitForCompletionOrCreateCheckStatusResponse(req, instanceId, 10000, 500);
    const operationCompleted = (result.status === 200);

    if (operationCompleted) {
        context.res.body = item;
    } else {
        context.res.status = 202;
    }
    context.res.headers.location = `/v2/api/items/${item.id}`;
};