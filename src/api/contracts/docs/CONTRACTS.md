### GET `/api/contracts`

> get a contract by its id

***Requires authentication header: profile_id: 4***

#### Request

```js
{}
```

#### Response

- Status 200:

```js
[
  {
    "id": 7,
    "terms": "bla bla bla",
    "status": "in_progress",
    "createdAt": "2022-02-25T04:11:11.264Z",
    "updatedAt": "2022-02-25T04:11:11.264Z",
    "ContractorId": 7,
    "ClientId": 4
  },
  {
    "id": 7,
    "terms": "bla bla bla",
    "status": "in_progress",
    "createdAt": "2022-02-25T04:11:11.264Z",
    "updatedAt": "2022-02-25T04:11:11.264Z",
    "ContractorId": 7,
    "ClientId": 4
  }
]
```

- Status 404:

```js
{
  "message": "Profile not found",
  "name": "ProfileNotFound",
  "status": 404
}
```

```js
{
  "message": 'The profile does not have active contracts',
  "name": "NotContractsFound",
  "status": 404
}
```



### GET `/api/contracts/7`

> get a contract by its id

***Requires authentication header: profile_id: 4***

#### Request

```js
{}
```

#### Response

- Status 200:

```js
{
    "id": 7,
    "terms": "bla bla bla",
    "status": "in_progress",
    "createdAt": "2022-02-25T04:11:11.264Z",
    "updatedAt": "2022-02-25T04:11:11.264Z",
    "ContractorId": 7,
    "ClientId": 4
}
```

- Status 404:

```js
{
  "message": "Profile not found",
  "name": "ProfileNotFound",
  "status": 404
}
```

```js
{
  "name": 'ContractNotFound',
  "message": 'Contract not found',
  "status": 404
}
```
