#[1. Category Route]
##1.1 Category ### [GET] /api/category
### request body:

```
{

}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" :
    {
        "category_name" : string
    }
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : failed to get category item
}
```

##1.2 Category_field ### [GET] /api/category_field
### request body:

```
{

}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" :
    {
        "category_id" : number,
        "category_field_name" : string
    }
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : failed to get category field name
}
```

##1.3 Category_field ### [GET] /api/category_field_option
### request body:

```
{

}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" :
    {
        "category_field_id" : number,
        "category_field_option" : string
    }
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : failed to get category field option
}
```

#[2. Status Route]
##2.1 Status ### [GET] /api/status
### request body:

```
{

}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" :
    {
        "status_id" : int
        "status_name" : string
    }
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : failed to get status
}
```

#[3. Order Status Route]
##3.1 Order Status ### [GET] /api/orderStatus
### request body:

```
{

}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" :
    {
        "order_status_id" : int
        "order_status_name" : string
    }
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : failed to get order status name
}
```

#[4. Logistic Company Route]
##4.1 Logistic Company ### [GET] /api/logistic_company
### request body:

```
{

}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" :
    {
        "logistic_company_id" : int,
        "logistic_company_name" : string,
        "logistic_company_url" : string
    }
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : failed to get order status name
}
```

#[4. User Route]
##4.1 User Registration ### [POST] /api/user/registration
### request body:

```
{
    "email" : string
    "password" : string
}
```

### response body:

```
[200] OK
{
    "jwt" : String
    "message" : Sign up successfully
}
```

```
[400] BAD REQUEST
{
    "message" : missing information
}
```

```
[400] BAD REQUEST
{
    "message" : failed to sign up
}
```

##4.2 User Login ### [POST] /api/user/login
### request body:

```
{
    "email" : string
    "password" : string
}
```

### response body:

```
[200] OK
{
    "jwt" : string
}
```

```
[400] BAD REQUEST
{
    "message" : missing username or password
}
```

##4.4 User Address Info ### [GET] /api/user/address
### request body:

```
{
}
```

### response body:

```
[200] OK
{
    "success" : true,
    "message" : login successfully
}
```

```
[204] No Content
{
    "success" : false,
    "message" : missing username or password
}
```

```
[400] BAD REQUEST
{
    "message" : missing username or password
}
```

##4.4 User Address Info ### [GET] /api/user/address
### request body:

```
{
}
```

### response body:

```
[200] OK
[{
    "address" :
    "is_primary" :
},...]
```

##4.4 User Address Info ### [GET] /api/user/payment
### request body:

```
{
}
```

### response body:

```
[200] OK
[{
    "payment_method" :
    "card_no" :
    "card_holder" :
    "card_holder_name" :
    "expiry_date" :
},...]
```

#[5. Request Route]
##5.1 User Request ### [POST] /api/request
### request body:

```
//with JWT header
//format: FormData
{
    "location_id" : int(location.location_id),
    "category_id" : int(category.category_id),
    "item" : string,
    "image_file" : string,
    "url" : string,
    "quality" : int,
    "request_remark" : string
    "offer_price" : int,
}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" : [
        {
        "request_id" : int
        "created_by" : int(user.user_id),
        "location_id" : int,
        "category_id" : int,
        "item" : string,
        "image" : string,
        "url" : string,
        "quality" : int,
        "offer_price" : int
        }
    ]
}
```

```
[204] No Content
{
    "success" : false,
    "message" : missing information
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : fail to post request
}
```

#[6. Offer Route]
##6.1 Provider Offer ### [POST] /api/offer
### request body:

```
{
    "request_id" : int(request.request_id),
    "provider_id" : int(provider.provider_id),
    "status" : int(status.status_id),
    "price" : int,
    "offer_remark" : string
    "jwt" :
}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" : [
        {
        "offer_id" : int,
        }
    ]
}
```

```
[204] No Content
{
    "success" : false,
    "message" : missing information
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : fail to post offer
}
```

##6.2 Get Provider Offer (user side) ### [GET] /api/get_offer
### request body:

```
{
    "jwt" :
}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" : [
    "order_id" : int(order.order_id)
    "request_id" : int(request.request_id),
    "provider_id" : int(provider.provider_id),
    "status" : int(status.status_id),
    "price" : int,
    "offer_remark" : string
    ]
}
```

```
[204] No Content
{
    "success" : false,
    "message" : missing information
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : fail to post offer
}
```

##6.3 Get Specific Provider Offer (user side) ### [GET] /api/get_offer/:id
### request body:

```
{
    "offer_id" : int
    "jwt" :
}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" : [
    "order_id" : int(order.order_id)
    "request_id" : int(request.request_id),
    "provider_id" : int(provider.provider_id),
    "status" : int(status.status_id),
    "price" : int,
    "offer_remark" : string
    ]
}
```

```
[204] No Content
{
    "success" : false,
    "message" : missing information
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : fail to post offer
}
```

#[7. Order Route]
##7.1 Order Request ### [POST] /api/order
### request body:

```
{
    "offer_id" : int(offer.offer_id),
    "order_status_id" : int(order_status.order_status_id),
    "logistic_company_id" : int(logistic_company.logistic_company_id),
    "shipping_order_no": int
    "jwt" :
}
```

### response body:

```
[200] OK
{
    "success" : true,
    "data" : [
        {
    "offer_id" : int(offer.offer_id),
    "order_status_id" : int(order_status.order_status_id),
    "logistic_company_id" : int(logistic_company.logistic_company_id),
    "shipping_order_no": int
        }
    ]
}
```

```
[204] No Content
{
    "success" : false,
    "message" : missing information
}
```

```
[400] BAD REQUEST
{
    "success" : false,
    "message" : fail to post order
}
```
