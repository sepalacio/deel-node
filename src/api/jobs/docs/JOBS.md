### GET `/api/jobs/unpaid`

> get all active & unpaid jobs for a client or a contractor

***Requires authentication header: profile_id=2***

#### Response

- Status 200:

```js
[
  {
    "id": 4,
    "description": "work",
    "price": 200,
    "paid": null,
    "paymentDate": null,
    "createdAt": "2022-02-25T04:11:11.264Z",
    "updatedAt": "2022-02-25T04:11:11.264Z",
    "ContractId": 4,
    "Contract": {
        "id": 4,
        "terms": "bla bla bla",
        "status": "in_progress",
        "createdAt": "2022-02-25T04:11:11.264Z",
        "updatedAt": "2022-02-25T04:11:11.264Z",
        "ContractorId": 7,
        "ClientId": 2
    }
  },
  {
    "id": 3,
    "description": "work",
    "price": 202,
    "paid": null,
    "paymentDate": null,
    "createdAt": "2022-02-25T04:11:11.264Z",
    "updatedAt": "2022-02-25T04:11:11.264Z",
    "ContractId": 3,
    "Contract": {
      "id": 3,
      "terms": "bla bla bla",
      "status": "in_progress",
      "createdAt": "2022-02-25T04:11:11.264Z",
      "updatedAt": "2022-02-25T04:11:11.264Z",
      "ContractorId": 6,
      "ClientId": 2
    }
  }
]
```

- Status 404:

```js
{
    "message": "There are not active jobs for this user",
    "name": "NotActiveJobsFound",
    "status": 404
}
```

