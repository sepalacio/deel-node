### POST `/balances/deposit/:userId`

>  Deposits money into the balance of a client

***Requires authentication header: profile_id=2***

#### Response

- Status 200:

```js
{
  "message": "The funds were loaded into the client`s Balance."
}
```

- Status 400:
```js
{
  "message": "Validation error",
  "name": "ValidationError",
  "code": "validation_error",
  "status": 400,
  "error": [
    {
        "param": "depositAmount",
        "msg": "The depositAmount is required"
    }
  ]
}
```

- Status 404:

```js
{
    "message": "There are not clients with the provided ID",
    "name": "ClientNotFound",
    "status": 404
}
```

- Status 422:

```js
{
    "message": "The deposit amount exceeds the 25% of total jobs to pay",
    "name": "InvalidDepositAmount",
    "status": 422
}
```
