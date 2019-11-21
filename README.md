# BE-Dom

## Endpoints:

POST `/api/register`: requires `username`, `password`, `email`

POST `/api/login`: requires `username`, `password`

GET `/api/jokes`: protected

POST `/api/jokes`: protected, requires `setup` and `punchline`

PUT `/api/jokes/:id`: protected

DELETE `/api/jokes/:id`: protected, testing