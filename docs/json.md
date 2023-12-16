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
10. [Provider Route](#-10-provider-route)

---

## 📎 1. Category Route

### 📍 1.1 Get all category Done~

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

### 📍 1.2 Category_field Done~

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

## 📎 2. Status Route Done~

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

### 📍 3.1 Order Status Done~

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

### 📍 4.1 User Registration Done~

|[POST] |/signup

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

### 📍 4.2 User Login Done~

| [POST] | /login |
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

### 📍 4.3.1 Create User Address Done *because have dummy data have to call 6 times after  

| [POST] | /api/user/address |
| ----- | ----------------- |

> ⬇️ Req Body:
"JWT in header" "Change is_Primary" 
```js
{
"address" :
    "String"
}
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
```

---

---

### 📍 4.3.2 User Address Info Done~

| [GET] | /api/user/addressInArrayFormat |
| ----- | ----------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
[   {
"address" :
    [
    String,
    String,
    String,
]
}
... ]
```

---
### 📍 4.3.2 User Address Info Done~

| [GET] | /api/user/addressInJsonFormat |
| ----- | ----------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
[   {
    addressId: int,
    address: string},
... ]
```

---

### 📍 4.3.3 Change User Primary Address Done

| [PUT] | /api/user/address/{addressId} |
| ----- | ----------------- |

> ⬇️ Req Body:
"JWT in header" "Change is_Primary" 
```js
{
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
[{
	"success": true,
	"message": "User address had been updated"
}]

```js
🔴 [400] BAD REQUEST
... ]
```

---

### 📍 4.3.3 Dalete User Address Done

| [DELETE] | /api/user/address/{addressId} |
| ----- | ----------------- |

> ⬇️ Req Body:
"JWT in header"
```js
{
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
... {
	"success": true,
	"message": "User address had been deleted, latest address is set to primary"
}

```js
🔴 [400] BAD REQUEST
... ]
```

---

### 📍 4.4 Get user payment method Done (updated with paymeny_methid_id)

| [GET] | /api/user/payment |
| ----- | ----------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
** HOLD **
// [{
		"payment_method_id": 3,
		"payment_method": "Visa",
		"card_no": "1234567890123456",
		"card_holder_name": "testing",
		"expiry_date": "12/22"
	},...]
```

---

### 📍 4.4.1 Create user payment method Done *because have dummy data have to call few times after

| [POST] | /api/user/payment |
| ----- | ----------------- |
> ⬇️ Req Body:
"JWT in header" "Change is_Primary" 
```js
{
		"payment_method": "Visa",
		"card_no": "1234567890123459",
		"card_holder_name": "testing_from_inso",
		"expiry_date": "12/22"
	}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
** HOLD **
{
	"success": true,
	"message": "User Payment Method had been created"
}
// 	
```

---
### 📍 4.4.2 Delete user payment method Done 

| [DELETE] | /api/user/payment/{paymentMethodId} |
| ----- | ----------------- |

> ⬇️ Req Body:
"JWT in header"
```js
{
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
... {
	"success": true,
	"message": "User Payment Method had been deleted"
}

```js
🔴 [400] BAD REQUEST
... ]
```

---
### 📍 4.4.3 Update user payment method Done 

| [POST] | /api/user/payment/{paymentMethodId} |
| ----- | ----------------- |
> ⬇️ Req Body:
"JWT in header" "Change is_Primary" 
```js
{
		"payment_method": "Visa",
		"card_no": "1234567890123459",
		"card_holder_name": "testing_from_inso",
		"expiry_date": "12/22"
	}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
** HOLD **
{
	"success": true,
	"message": "User Payment Method had been updated"
}
// 	
```

---
### 📍 4.5 Get user Done 

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

### 📍 5.1 Create Request Done~

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

### 📍 5.2 Get All Requests (Limit 30) Done~

| [Get] | /request |
| ----- | ------------ |

##### 📍 5.2.1 Get All - with queries  Done(waiting for test)

| [Get] | /api/request?p={page}&category={category}&location={location} |
| ----- | ------------------------------------------------------------- |

##### 📍 5.2.2 Get All - by userId (via created_by) Done~

| [Get] | /api/user/request (userId in jwt header) |
| ----- | ---------------------------------------- |

> ⬆️ Resp:

> Sort by updated_at desc && isActive === true

```js
🟢 [200]  OK
[
{
    "requestId" : string (ulid),
    "createdBy": string(user.username),
    "locationName" : string(location.name),
    "item" : string,
    "primaryImage" : string,
    "offerPrice"? : float,
    "createdAt": DateTime,
    "updatedAt": DateTime
},.../* Max 30 Requests */]
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : "fail to get request"
}
```

### 📍 5.3 Get One (by request id) Done~

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
    "primaryImage" : String,
    "images" : [{
        "requestId" : String,
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
    "imageId":
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

| [PUT] | /api/request/update/:requestId |
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

### 📍 5.6 Delete User Request Done~

| [DELETE] | /api/request/:requestId |
| -------- | ----------------------- |
"chanage image is active"
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

### 📍 6.1 Create New Offer Done~

| [POST] | /api/offer |
| ------ | ---------- |
 "jwt"
> ⬇️ Req Body:

```js
{
    "requestId" : ulid(request.request_id),
    "price" : int,
    "estimatedProcessTime" : int,
    "offerRemark" : string | undefined
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to post offer
}
```

### 📍 6.2 Get Request Offer (user side) Done~

| [GET] | /api/offer/request/:requestId
| ----- | -------------- |
"jwt" :
> ⬇️ Req Body:

```js
{
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
[{
    "offerId" : int(offer_id)
    "requestId" : int(request.request_id),
    "providerId" : int(provider.provider_id),
    "providerName": string(user.username),
    "efficiency": float (max 5)
    "attitude": float (max 5)
    "statusName": string
    "price" : float,
    "estimatedProcessTime": int (days),
    "offerRemark"? : string   
},...]
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to get offer
}
```

### 📍 6.3 Accpet offer

| [POST] | /api/offer/:offerId |
| ----- | ------------------ |

"jwt"

> ⬇️ Req Body:

```js
{
    "offerId" : int(offer.offer_id),
    "userAddressId": int,
    XXXXX "price": int //Fred comment: price should not provide by request,but check via SQL by offerId
}
```
```js
🟢 [200]  OK
REDIRECT TO PAYMENT PAGE
```
```js
🔴 [400] BAD REQUEST
{
    "message" : fail to get offer
}
```
---

## 📎 7. Order Route

### 📍 7.1 Order Request
"jwt"
"Change request status, offer status"
| [POST]| /api/order |
| ----- | ------------- |
(Payment website callback)
"jwt"
> ⬇️ Req Body:

```js
{
    "offerId" : String//ulid(offer.offer_id),
    "userAddressId": int,
    "price": int
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "orderId": ulid(order.id)
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to post order
}
```

## 📎 8. Location Route Done~

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

## 📎 9. Logistic Company Route Done~

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
## 📎 10. Provider Route 

### 📍 10.1 Create Provider Done

| [POST] | /api/provider/{locationId}|
| ----- | --------------------- |
"jwt" :
> ⬇️ Req Body:

```
{
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
	"success": Boolean,
	"message": "Provider had been created ProviderId: providerId//ULID"
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : message" : invalid Token / locationId 
}
```

---
