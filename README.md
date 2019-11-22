# RESTful HTTP API using Durable Entities

## Resources

* `GET /api/:version/items` - get all items
* `GET /api/:version/items/:id` - get single item
* `POST /api/:version/items` - create item - send item in body
* `PUT /api/:version/items/:id` - update item - send item in body
* `DELETE /api/:version/items/:id` - delete item

## Versions

# Eventually consistent (v1)

Create/update/delete signals the entity asynchronously and returns before the item is updated.

# Synchronous (v2)

Create/update/delete waits for entity to be saved before they return a result.
