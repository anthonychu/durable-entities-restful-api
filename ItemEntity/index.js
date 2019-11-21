const df = require('durable-functions');

module.exports = df.entity(function (context) {
    const item = context.df.getInput();
    switch (context.df.operationName) {
        case 'create':
        case 'update':
            context.df.setState(item);
            return item;
        case 'delete':
            context.df.destructOnExit();
            break;
    }
});