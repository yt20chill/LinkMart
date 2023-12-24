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
//     "providerId" :
// }]
```

---
### 📍 4.6 Change username and password Done~

| [PUT] | /api/user/info |
| ----- | ----------------- |
> ⬇️ Req Body:
"JWT in header" "Change is_Primary" 
```js
{
	"username"?: String,
	"password"?: String
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
```
```js
🔴 [400] BAD REQUEST
{
    "message" : "fail to update info"
}
```

---

## 📎 5. Request Route

### 📍 5.1.1 Create Request Done~

| [POST] | /api/request |
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
	"requestId": String,
	"createdBy": String,
	"locationId": int,
	"categoryId": int,
	"itemDetail": null || { },
	"primaryImage": String,
	"item": String,
	"url": String,
	"quantity": String,
	"offerPrice": int,
	"requestRemark": null || String,
	"createdAt": "2023-12-18 11:58:57.507984",
	"updatedAt": "2023-12-18 11:58:57.507984",
	"images": [
		{
			"imageId": int,
			"requestId": String,
			"imagePath": String,
			"createdAt": 1702871937518,
			"updatedAt": 1702871937518
		}

```

```js
🔴 [400] BAD REQUEST
{
    "message" : "fail to post request"
}
```
### 📍 5.1.2 Create Clone Request

| [POST] | /api/request/clone |
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
    "primaryImage" : String
    "imageFile" : [string, ...]  (FormData Files) or (String url)
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
	"requestId": String,
	"createdBy": String,
	"locationId": int,
	"categoryId": int,
	"itemDetail": null || { },
	"primaryImage": String,
	"item": String,
	"url": String,
	"quantity": String,
	"offerPrice": int,
	"requestRemark": null || String,
	"createdAt": "2023-12-18 11:58:57.507984",
	"updatedAt": "2023-12-18 11:58:57.507984",
	"images": [
		{
			"imageId": int,
			"requestId": String,
			"imagePath": String,
			"createdAt": 1702871937518,
			"updatedAt": 1702871937518
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

### 📍 5.2.1 Get All - with queries  Done(waiting for test)

| [Get] | /request?p={page}&category={category}&location={location} |
| ----- | ------------------------------------------------------------- |

"Total active request"
"Number of page(active request / limit )"

### 📍 5.2.2 Get All - by userId (ACTIVE) Done~

| [Get] | /api/request (userId in jwt header) |
| ----- | ---------------------------------------- |

> ⬆️ Resp:

> Sort by updated_at desc && isActive === true

```js
🟢 [200]  OK
{
totalRecords: int
totalPages: int
requests: [
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
### 📍 5.2.3 Get All - by userId (INACTIVE) Done~

| [Get] | /api/request (userId in jwt header) |
| ----- | ---------------------------------------- |

> ⬆️ Resp:

> Sort by updated_at desc && isActive === false

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
}
🔴 [400]
{
    "message" : "delete fail"
}
```

### 📍 5.4 User delete request image

| [PUT] | /api/request/image/:imageId |
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

### 📍 5.5 Update User Request Detail

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

### 📍 5.6 Delete User Request Done~

| [DELETE] | /api/request/:requestId |
| -------- | ----------------------- |
"chanage is active = false"
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
    "message" : "fail to put request image"
}
```
### 📍 5.7 Find my reuqest history

| [GET] | /api/request/history |
| -------- | ----------------------- |
> ⬆️ Resp:

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
    "message" : "fail to get my inactive request"
}
```
### 📍 5.8 Check request if this provider has offered

| [GET] | /api/request/provider/:requestId |
| -------- | ----------------------- |
"jwt"
> ⬆️ Resp:

```js
🟢 [200]  OK
[
{
	"hasOffered": boolean
}
```

```js
🔴 [400] BAD REQUEST
{
    "message": fail to get data from database
}
```


## 📎 6. Offer Route

### 📍 6.1.1 Create New Offer Done~

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
### 📍 6.1.2 GET Offer (provider) Done~

| [GET] | /api/offer/myOffer |
| ------ | ---------- |
 "jwt"

> ⬆️ Resp:

```js
🟢 [200]  OK
[
	{
		"item": String,
		"offerStatus": String,
		"estimatedProcessTime": int,
		"createdBy": String (user),
		"primaryImage": String,
		"requestId": int,
		"offerId": int,
		"price": int (provider offer price)
	},
	...
]
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to change offer
}
```

### 📍 6.1.3 GET Offer detail (provider)

| [GET] | /api/offer/:offerId |
| ------ | ---------- |
 "jwt"

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
    "offerStatus" : String,
    "estimatedProcessTime" : int,
    "price": int,
    "offerRemark": String
}
RequestDetails (5.3) + offerStatus + estimatedProcessTime + price + offerRemark

```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to change offer
}
```

### 📍 6.1.4 Amend Offer (provider) 

| [PUT] | /api/offer/:offerId |
| ------ | ---------- |
 "jwt"
> ⬇️ Req Body:

```js
{
    "price" : float,
    "estimatedProcessTime" : int,
    "offerRemark" : string | undefined
}
```
```
> ⬆️ Resp:

```js
🟢 [200]  OK
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to change offer
}
```
### 📍 6.1.5 DELETE Offer (provider) Change Status Aborted

| [DELETE] | /api/offer/:offerId |
| ------ | ---------- |
 "jwt"
```
> ⬆️ Resp:

```js
🟢 [200]  OK
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to delete offer
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
    "efficiency": float (max 5),
    "attitude": float (max 5),
    "reviewCount": int,
    "statusName": string
    "price" : float,
    "estimatedProcessTime": int, //(days)
    "offerRemark"? : string,
},...]
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to get offer
}
```

### 📍 6.3 Accpet offer Done

| [POST] | /api/offer/:offerId |
| ----- | ------------------ |

"jwt"

> ⬇️ Req Body:

```js
{
    "userAddressId": int,
}
```
> ⬆️ Resp:

```js
🟢 [303]  Redirect
url: BACKEND_DOMAIN/api/offer/paymentInfo/" + offerId + "/" + addressId
{
    "offerId" : string (offer.offer_id)
    "userAddressId": int
    "price": float
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to get offer
}
```
---
### 📍 6.3 Payment process Done

| [GET] | /api/offer/paymentInfo/{offerId}/{addressId} |
| ----- | ------------------ |

"jwt"

> ⬇️ Req Body:

```js
{
    
}
```
> ⬆️ Resp:

```js
🟢 [200]  ok

{
  "offerId": "string",
  "userUsername": "string",
  "userEmail": "string",
  "userAddress": {
    "address": "string"
  },
  "providerUsername": "string",
  "location": "string",
  "item": "string",
  "primary_image": "string",
  "quantity": "string",
  "price": 0,
  "userPaymentMethod": {
    "payment_method_id": 0,
    "payment_method": "string",
    "card_no": "string",
    "card_holder_name": "string",
    "expiry_date": "string"
  }
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to get offer
}
```
---

### 📍 6.4 Reject offer

| [DELETE] | /api/offer/:offerId |
| ----- | ------------------ |

"jwt"

> ⬇️ Req Body:

```js
{
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
    "message" : fail to reject offer
}
```
---

## 📎 7. Order Route

### 📍 7.1 Create Order (Payment Success)Done
"jwt"
(Mock Payment website callback)
"Change request status, offer status"
Success
| [GET]| /api/order?success=true&offerId={offerId}&userAddressId={userAddressId}&price={price} |
| ----- | ------------- |


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

### 📍 7.1.2 Create Order (Payment Cancelled)Done
| [GET]| /api/order?cancelled=true&offerId={offerId}&userAddressId={userAddressId}&price={price} |
| ----- | ------------- |
> ⬆️ Resp:

```js
🟢 [200]  OK
{
    "message": "payment cancelled"
}
```

### 📍 7.2 Get All Order By UserId Done
| [GET]| /api/user/order |
| ----- | ------------- |
"jwt"
> ⬆️ Resp:
```js
🟢 [200]  OK
[{
  "orderId": string,
  "orderStatus": string,
  "providerId": int,
  "providerName": string,
  "item": string,
  "primaryImage": string,
  "quantity": string,
  "price": float,
  "estimatedProcessTime": int (days), * added 17Dec 10:10PM by Fredy
  "createdAt": Date,
},...],
```
```js
🔴 [400] BAD REQUEST
{
    "message" : failed to get orders
}
```
### 📍 7.3.1 Get All inProgress Order By UserId Done orderStatus = {create, in-progress,shipped,completed}
| [GET]| /api/prvoider/order/inProgress | status=in-progress&shipped|
| ----- | ------------- |--|
| [GET]| /api/provider/order/complete | status=completed&cancelled| 
| ----- | ------------- |--|
"jwt"
> ⬆️ Resp:
```js
🟢 [200]  OK
[{
  "orderId": string,
  "orderStatus": string,
  "providerId": int,
  "providerName": string,
  "item": string,
  "primaryImage": string,
  "quantity": int,
  "price": float,
  "estimatedProcessTime": int
  "createdAt": Date,
},...],
```
```js
🔴 [400] BAD REQUEST
{
    "message" : failed to get orders
}
```
### 📍 7.3.2 Get All inProgress Order By UserId orderStatus = {create, in-progress,shipped,completed}
| [GET]| /api/user/order/inProgress | status=in-progress&shipped|
| ----- | ------------- |--|
| [GET]| /api/user/order/complete | status=completed&cancelled| 
| ----- | ------------- |--|
"jwt"
> ⬆️ Resp:
```js
🟢 [200]  OK
[{
  "orderId": string,
  "orderStatus": string,
  "userId": int,
  "createdBy": string,
  "item": string,
  "primaryImage": string,
  "quantity": int,
  "price": float,
  "estimatedProcessTime": int 
  "createdAt": Date,
},...],
```
```js
🔴 [400] BAD REQUEST
{
    "message" : failed to get orders
}
```
### 📍 7.4 Get All completed Order By UserId Done
| [GET]| /api/user/order/complete |
| ----- | ------------- |
"jwt"
> ⬆️ Resp:
```js
🟢 [200]  OK
{
  "orderId": string,
  "orderStatus": string,
  "providerId": int,
  "providerName": string,
  "item": string,
  "primaryImage": string,
  "quantity": int,
  "price": float,
  "estimatedProcessTime": int (days), * added 17Dec 10:10PM by Fredy
  "createdAt": Date,
},
```
```js
🔴 [400] BAD REQUEST
{
    "message" : failed to get orders
}
```

### 📍 7.5 Get Order details by orderId Done
| [GET]| /api/order/:orderId |
| ----- | ------------- |
"jwt"
> ⬆️ Resp:
```js
🟢 [200]  OK
[{
  "orderId": string,
  "orderStatus": string,
  "providerId": int,
  "providerName": string,
  "item": string,
  "primaryImage": string,
  "quantity": int,
  "price": float,
  "estimatedProcessTime": int (days), * added 17Dec 10:10PM by Fredy
  "createdAt": Date,
  "updatedAt": Date
  "requestId": string,
  "locationName": string,
  "createdBy": string,
  "images": string[] (imagePath),
  "itemDetail": JSON or null,
  "url": string,
  "requestRemark" string,
  "shipmentProof": null,
  "shippingOrderNo": "1234567890",
  "logisticCompanyName": "DHL"
  "Address": String
},...],
```
```js
🔴 [400] BAD REQUEST
{
    "message" : failed to get orders
}
```
### 📍 7.6 Provider update shipping detail DONE
| [PUT]| /api/order/:orderId |
| ----- | ------------- |
"jwt"
> ⬇️ Req Body:
> FormData

```js
{
	"logisticCompanyId" : int
	"shippingOrderNo" : String
	"shipmentProof": File
}
```

> ⬆️ Resp:
```js
🟢 [200]  OK
```
```js
🔴 [400] BAD REQUEST
{
    "message" : failed to update order shipping detail
}
```

### 📍 7.7 Review Order
| [POST]| /api/order/:orderId/review |
| ----- | ------------- |
"jwt"
> ⬇️ Req Body:

```js
{
	"efficiency": float 0-5
	"attitude": float 0-5
	"comments": string | undefined
}
```

> ⬆️ Resp:
```js
🟢 [200]  OK
```
```js
🔴 [400] BAD REQUEST
{
    "message" : failed to update order shipping detail
}
```
### 📍 7.8 SSE Order Status Done
| [GET]| /api/order/sse |
| ----- | ------------- |
"jwt"
> ⬇️ Req Body:

```Note: Please use EventSourse and the eventSourse.onmessage for reciving the event
```

> ⬆️ Resp:
```js
🟢 [200]  OK
```
{
	"Orderid" : String 
}
```js
🔴 [400] BAD REQUEST
{
    "message" : failed to update order shipping detail
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

| [GET] | /logisticCompany |
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
### 📍 9.2 Upload Logistic Company

| [GET] | /api/logisticCompany |
| ----- | --------------------- |

> ⬆️ Resp:

```js
🟢 [200]  OK
{
	"companyName" : "ABC",
	"companyUrl" : "123"
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : failed to upload logistic company
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

### 📍 10.2 Create Provider

| [POST] | /api/provider|
| ----- | --------------------- |
"jwt" :
> ⬇️ Req Body:
> FormData

```
{
    "locationId": int
    "addressDocument": File
    "idDocument": File
    "bankDocument": File
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
	"providerId": string ulid (provider.id)
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : string
}
```
### 📍 10.3 Get Application Status

| [GET] | /api/provider|
| ----- | --------------------- |
"jwt" :
> ⬇️ Req Body:

```

```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
data: {
	"verificationId": string ulid (provider.id)
	"statusName": string
	"idDocument": string url
	"addressDocument": string url
	"bankDocument": string url
	} | null
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : string
}
```
### 📍 10.4 Get Provider Profile
**Two Routes: 1 guarded 1 public**

| [GET] | /api/provider/profile|
| [GET] | /provider/profile/:providerId
| ----- | --------------------- |
"jwt" :
> ⬇️ Req Body:

```

```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
	"username" : string
	"averageEfficiency" : float 0-5
	"averageAttitude" : float 0-5
	"reviewCount" : int
	"reviews" : [{
	"primaryImage" : string url
	"item" : string
	"efficiency" : 0-5
	"attitude" : 0-5
	"comments": string
}
,...]
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : string
}
```
### 📍 10.5 Get Provider Dashboard

| [GET] | /api/provider/dashboard|
| ----- | --------------------- |
"jwt" :
> ⬇️ Req Body:

```

```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
	"balance" : float
	"averageEfficiency" : float 0-5
	"averageAttitude" : float 0-5
	"reviewCount" : int
	"offerCount": int
	"taskCount": int
}
,...]
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : string
}
```


---
## 📎 11. For Nic

### 📍 11.1 payment

| [PUT] | /api/offer/:offerId |
| ----- | --------------------- |
"jwt" :
> ⬇️ Req Body:

```
{
	"userAddresId" : int
}
```

> ⬆️ Resp:

```js
🟢 [200]  OK
{
	"url" : /user/payment?addressId={}&price={}
	"offerId" : String,
	"userAddressId" : int,
	"price": int
	
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : message" : fail to redirect
}
```

---
### 📍 11.2 payment success

| [GET] | /api/order?success=true&offer={}&userAddressId={}&price={} |
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
	"offerId" : String
}
```

```js
🔴 [400] BAD REQUEST
{
    "message" : fail to pay 
}
```

---
