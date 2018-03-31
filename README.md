# edx_nodejs_module3

Module 3 Assignment

Command line example usage:

`node mod3.js`

or

`node mod3.js 200` 

Output looks like:
`
Async start: 5 parallel task(s)
Processing 0-200 out of 1000
Processing 200-400 out of 1000
Processing 400-600 out of 1000
Processing 600-800 out of 1000
Processing 800-1000 out of 1000
Performance (ms): Start: 1522461008980 End: 1522461009577 Elapsed: 597
`


For the code design I pretty much just did things sequentially, ie read the files into memory then output to the DB.

I had issues with the DB connection and needed to include the step: 
  var db=database.db('edx-course-db');  

I also had problems with using the async.


For testing I ran a lot of tests and checked the DB collection via mongo.

Through lots of testing I also had to drop the DB to clean up before each run otherwise I ended up with duplicate data eg:
```
> db.customers.find({"email": "kyuranovevf@wordpress.org"});
{ "_id" : ObjectId("5abee2534749fc08e37fdf05"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
{ "_id" : ObjectId("5abee33dd28ac1090ac5cede"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
{ "_id" : ObjectId("5abee3b7930096091f255663"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
{ "_id" : ObjectId("5abee4d59efed1093fbecb07"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
{ "_id" : ObjectId("5abee4ea5d8426094e05bab3"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
{ "_id" : ObjectId("5abee5035049a2095eab94a3"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
{ "_id" : ObjectId("5abee52a785e68096fdf36b1"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
{ "_id" : ObjectId("5abee54bbefde2097f1f34b3"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
{ "_id" : ObjectId("5abee58ff8c3e8099064cf06"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
{ "_id" : ObjectId("5abee5c7cb74c609a466a5e1"), "id" : "16", "first_name" : "Katine", "last_name" : "Yuranovev", "email" : "kyuranovevf@wordpress.org", "gender" : "Female", "ip_address" : "73.223.18.166", "ssn" : "533-35-2570", "credit_card" : "5610288862731702", "bitcoin" : "1FSRBcozU9k8b943rjP5TXnRBkSBWYXWFL", "street_address" : "4 Mifflin Park", "country" : "United States", "city" : "Knoxville", "state" : "Tennessee", "phone" : "865-555-0065" }
> db.dropDatabase();
{ "dropped" : "custdb", "ok" : 1 }
>
>
> db.customers.find({"email": "kyuranovevf@wordpress.org"});
>
```
