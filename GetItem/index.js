const df = require('durable-functions');

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const id = req.params.id;

    const entityId = new df.EntityId('ItemEntity', id);
    const entity =  await client.readEntityState(entityId);

    if (entity.entityExists) {
        context.res.body = entity.entityState;
    } else {
        context.res.status = 404;
    }
};