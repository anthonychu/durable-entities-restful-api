const df = require('durable-functions');
const uuid = require('uuid/v4');

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const item = req.body;
    item.id = uuid();
    
    const entityId = new df.EntityId('ItemEntity', item.id);
    client.signalEntity(entityId, 'create', item);

    context.res.status = 202;
    context.res.headers.location = `/v1/api/items/${item.id}`;
};