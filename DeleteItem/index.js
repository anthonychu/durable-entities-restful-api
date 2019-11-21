const df = require('durable-functions');

module.exports = async function (context, req) {
    const id = req.params.id;
    if (id) {
        const client = df.getClient(context);
        const entityId = new df.EntityId('ItemEntity', id);
        await client.signalEntity(entityId, 'delete');
    }
    context.res.status = 202;
};