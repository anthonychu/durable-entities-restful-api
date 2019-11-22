const df = require('durable-functions');

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const action = {
        item: {
            id: req.params.id
        },
        operationName: 'delete'
    };

    const instanceId = await client.startNew('ItemEntityOrchestrator', undefined, action);
    const result = await client.waitForCompletionOrCreateCheckStatusResponse(req, instanceId, 10000, 500);
    const operationCompleted = (result.status === 200);
    context.res.status = operationCompleted ? 204 : 202;
};