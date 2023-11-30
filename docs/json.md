#[1.User Route]
##1.1 User Registration
###[POST] /api/user/registration
###request body: 
```
{
    "email" : string
    "password" : string
    "user_username" : string
    "birth_date" : string
}
```
###response body:
```
[200] OK
{
    "success" : true,
    "message" : Sign up successfully
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
    "message" : failed to sign up
}
```
##1.2 User Login
###[POST] /api/user/login
###request body: 
```
{
    "email" : string
    "password" : string
}
```
###response body:
```
[200] OK
{
    "success" : true,
    "token" : string
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
    "success" : false,
    "message" : invalid username or password
}
```
##1.3 User Logout
###[POST] /api/user/logout
###request body: 
```
{
    "user_id" : string
}
```
###response body:
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
    "success" : false,
    "message" : invalid username or password
}
```