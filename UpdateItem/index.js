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
    
    const entityId = new df.EntityId('ItemEntity', id);
    client.signalEntity(entityId, 'update', item);

    context.res.status = 202;
    context.res.headers.location = `/api/items/${item.id}`;
};