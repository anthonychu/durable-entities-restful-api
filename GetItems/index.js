const df = require('durable-functions');

module.exports = async function (context, req) {
    const client = df.getClient(context);
    const items = await client.getStatusAll();
    context.res.body = items
        .filter(i => i.input && i.input.exists)
        .map(i => JSON.parse(i.input.state));
};