#### category_fields (seed)
id: int
category_id: int
field_name: string
isOption: boolean
----
#### field_options (seed)
field_id: field.id
option_name:string
----
#### request_detail (by request, can be put/post)
request_id: request.id
field : field.id
value? : string (isOption === false)
option?: option.id (isOption === true)
