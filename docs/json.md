# 🛒 Linkmart

## 📁 Document

### 🔗 Routes

1. [Category Route](#-1-category-route)
2. [State Route](#-2-status-route)
3. [Order State Route](#-3-order-status-route)
4. [User Route](#-4-user-route)
5. [Request Route](#-5-request-route)
6. [Offer Route](#-6-offer-route)
7. [Order Route](#-7-order-route)
8. [Location Route](#-8-location-route)
9. [Logistic Company Route](#-9-logistic-company-route)

---

## 📎 1. Category Route

### 📍 1.1 Get all category

| [GET] | /category |
| ----- | ------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
[{
    "categoryId": int,
    "categoryName": string
},...]
```

```js
🔴 [400] BAD REQUEST
{
    "message" : failed to get category item
}
```

---

### 📍 1.2 Category_field

| [GET] | /category/:categoryId |
| ----- | ------------------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
[{
    "categoryFieldId" : int,
    "categoryFieldName" : string,
    "categoryFieldOption": [{ //
        "categoryFieldOptionName": string,
    },...]
}, ... /* array */ ]
```

```js
🔴 [400] BAD REQUEST
{
    "message" : failed to get category field name
}
```

---

## 📎 2. Status Route

### 📍 2.1 Status

| [GET] | /status |
| ----- | ----------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "statusId" : int,
    "statusName" : string
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : failed to get status
}
```

---

## 📎 3. Order Status Route

### 📍 3.1 Order Status

| [GET] | /orderStatus |
| ----- | ---------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "orderStatusId" : int
    "orderStatusName" : string
}
```

```js
🔴 [400] BAD REQUEST
{
    "success" : false,
    "message" : failed to get order status name
}
```

---

## 📎 4. User Route

### 📍 4.1 User Registration

|[POST] |/api/user/registration

> ⬇️ Req Body:

```js
{
    "email" : string
    "password" : string
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "jwt" : String
    "message" : Sign up successfully
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : missing information
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : failed to sign up
}
```

---

### 📍 4.2 User Login

| [POST] | /api/user/login |
| ------ | --------------- |

> ⬇️ Req Body:

```js
{
    "email" : string
    "password" : string
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "jwt" : string
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : missing username or password
}
```


---

### 📍 4.3 User Address Info

| [GET] | /api/user/address |
| ----- | ----------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
[{
    "address" :
    "isPrimary" :
},...]
```

---

### 📍 4.4 Get user payment method

| [GET] | /api/user/payment |
| ----- | ----------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
** HOLD **
// [{
//     "payment_method" :
//     "card_no" :
//     "card_holder" :
//     "card_holder_name" :
//     "expiry_date" :
// },...]
```

---

### 📍 4.5 Get user

| [GET] | /api/user |
| ----- | ----------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
** HOLD **
// [{
//     "username" :
//     "provider_id" :
// }]
```

---

## 📎 5. Request Route

### 📍 5.1 Create Request

| [POST] | /request |
| ------ | ------------ |

> ⬇️ Req Body:

```js
//with JWT header
//format: FormData
{
    "locationId" : int(location.location_id),
    "categoryId" : int(category.category_id),
    "itemDetail": JSON {category_field.name: category_field_value/option_name, ...}
    "item" : string,
    "imageFile" : [string, ...(FormData Files)]
    "url" : string | null,
    "quantity" : int,
    "requestRemark" : string | null,
    "offerPrice" : float | null,
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "message": "success"
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : "fail to post request"
}
```

### 📍 5.2 Get All Requests (Limit 30)

| [Get] | /api/request |
| ----- | ------------ |

##### 📍 5.2.1 Get All - with queries

| [Get] | /api/request?p={page}&category={category}&location={location} |
| ----- | ------------------------------------------------------------- |

##### 📍 5.2.2 Get All - by userId (via created_by)

| [Get] | /api/user/request (userId in jwt header) |
| ----- | ---------------------------------------- |

> ⬆️ Resp:

> Sort by updated_at desc && isActive === true
> Limit 30

```js
🟢 [200]  OK
[{
    "requestId" : string (ulid),
    "locationId" : int(location.location_id),
    "locationName" : string(location.name),
    "item" : string,
    "image" : string
    "offerPrice"? : float,
    "createdBy": string(user.username)
    "updatedAt": DateTime
},.../* Max 30Requests */]
```

```js
🔴 [400] BAD REQUEST
{
    "message" : "fail to get request"
}
```

### 📍 5.3 Get One (by request id)

| [GET] | /api/request/:requestId |
| ----- | ----------------------- |

> ⬆️ Resp:

```js
🟢 [200]
{
    "requestId" : string (ulid),
    "locationId" : int(location.location_id),
    "locationName": string,
    "categoryId" : int(category.category_id),
    "categoryName" : string,
    "itemDetail": JSON {category_field.name: category_field_value/option_name, ...}
    "item" : string,
    "images" : [{
        "imageId" : int,
        "imagePath" : string
    },.../*images*/]
    "url" : string | null,
    "quantity" : int,
    "requestRemark" : string | null,
    "offerPrice" : float | null,
    "createdBy" : string(username),
    "createdAt" : Date,
    "updatedAt" : Date
}
🔴 [400]
{
    "message" : "delete fail"
}
```

### 📍 5.4 User delete request image

| [DELETE] | /api/request/image/:imageId |
| -------- | --------------------------- |

> ⬇️ Req Body:

```js
//with JWT header
```

> ⬆️ Resp:

```js
🟢 [200]
{
    "message" : "delete success"
}
🔴 [400]
{
    "message" : "delete fail"
}
```

### 📍 5.5 Update User Request

| [PUT] | /api/request/:requestId |
| ----- | ----------------------- |

> ⬇️ Req Body:

```js
//with JWT header
//format: FormData
{
    "itemDetail": JSON {category_field.name: category_field_value/option_name, ...}
    "item" : string,
    "imageFile"? : string, (multiple)
    "url" : string | null,
    "quantity" : int,
    "requestRemark" : string | null,
    "offerPrice" : float | null,
}
```

### 📍 5.6 Delete User Request

| [DELETE] | /api/request/:requestId |
| -------- | ----------------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "message" : "success"
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : "fail to put request"
}
```

## 📎 6. Offer Route

### 📍 6.1 Create New Offer

| [POST] | /api/offer |
| ------ | ---------- |

> ⬇️ Req Body:

```js
{
    "requestId" : ulid(request.request_id),
    "providerId" : ulid(provider.provider_id),
    "status" : int(status.status_id),
    "price" : int,
    "offerRemark" : string
    "jwt" :
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "success" : true,
    "data" : [
        {
        "offerId" : int,
        }
    ]
}
```

```js
🔴 [400] BAD REQUEST
{
    "success" : false,
    "message" : fail to post offer
}
```

### 📍 6.2 Get Provider Offer (user side)

| [GET] | /api/get_offer |
| ----- | -------------- |

> ⬇️ Req Body:

```js
{
    "jwt" :
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "success" : true,
    "data" : [
    "orderId" : int(order.order_id)
    "requestId" : int(request.request_id),
    "providerId" : int(provider.provider_id),
    "status" : int(status.status_id),
    "price" : int,
    "offerRemark" : string
    ]
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to post offer
}
```

### 📍 6.3 Get Specific Provider Offer (user side)

| [GET] | /api/get_offer/:id |
| ----- | ------------------ |

> ⬇️ Req Body:

```js
//with JWT Header
//Body
{
    "offerId" : int
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
[{
    "orderId" : int(order.order_id)
    "requestId" : int(request.request_id),
    "providerId" : int(provider.provider_id),
    "status" : int(status.status_id),
    "price" : int,
    "offerRemark" : string
},...]
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to post offer
}
```

## 📎 7. Order Route

### 📍 7.1 Order Request

| [POST]| /api/order

> ⬇️ Req Body:

```js
{
    "offerId" : int(offer.offer_id),
    "orderStatusId" : int(order_status.order_status_id),
    "logisticCompany_id" : int(logistic_company.logistic_company_id),
    "shippingOrderNo": int
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
[{
    "offerId" : int(offer.offer_id),
    "orderStatusId" : int(order_status.order_status_id),
    "logisticCompanyId" : int(logistic_company.logistic_company_id),
    "shippingOrderNo": int
},...]
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to post order
}
```

## 📎 8. Location Route

### 8.1 Order Request

| [GET] | /location |
| ----- | ------------- |

> ⬆️ Resp:

```js
[{
    id: int,
    locationName: string
},...]
```

## 📎 9. Logistic Company Route

### 📍 9.1 Logistic Company

| [GET] | /logistic_company |
| ----- | --------------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "logisticCompanyId" : int,
    "logisticCompanyName" : string,
    "logisticCompanyUrl" : string
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : failed to get order status name
}
```

---
