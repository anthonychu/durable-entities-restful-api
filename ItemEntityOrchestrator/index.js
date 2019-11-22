const df = require('durable-functions');

module.exports = df.orchestrator(function* (context) {
    const input = context.df.getInput();
    const entityId = new df.EntityId('ItemEntity', input.item.id);
    return yield context.df.callEntity(entityId, input.operationName, input.item);
});