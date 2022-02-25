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
