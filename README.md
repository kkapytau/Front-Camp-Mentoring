# Front-Camp-Mentoring	Mongo DB Part1

1) Download "Mongo DB" from https://www.mongodb.com/
2) Add to the Path - path to the "bin" folder for mongoDb (like: C:\Program Files\MongoDB\Server\3.6\bin\)
3) Create folder db
## in the new "command line"
4) run: mongod --dbpath ./db
5) run: mongoimport --db frontcamp --collection restaurants --file restaurants.json
6) run: "mongo" and then "use frontcamp"

# Task 3:
1) db.restaurants.find({$and:[ {cuisine: 'Chinese'},{borough:"Queens"}]}).count()		Result: 728

2) db.restaurants.find({},{restaurant_id:1}).sort({'grades.score':-1}).limit(1)			Results: max score = 131			ObjectId("5a5b799d670ef66f4cf3720d"), "restaurant_id" : "40372466" } (ObjectId should be different per DB)

3) db.restaurants.update({borough: 'Manhattan'},{$push: {grades:{ grade: "A", score: 7, date: ISODate() }}},{ multi: true })		Results: WriteResult({ "nMatched" : 10259, "nUpserted" : 0, "nModified" : 10259 })

4) db.restaurants.find({'grades.8.score': {$lt: 7}},{name:1, _id:0})	Results: "Silver Krust West Indian Restaurant" and "Pure Food"

5) db.restaurants.find({$and:[{cuisine:"Seafood"},{'grades': { $elemMatch: {grade:"B", 
	date: {$lte: ISODate("2014-03-01T00:00:00.000Z"), $gte: ISODate("2014-02-01T00:00:00.000Z")}} }} ]},{borough:1})	Results: "Bronx", "Manhattan"


	
# Task 4:	via "Compass"
1)	db.restaurants.createIndex({name:1})	Before: Documents Examined:25359 	After: Documents Examined:1

2) 	Before: db.restaurants.getIndexes() -> return 2 objects		After:	db.restaurants.dropIndex("name_1")	command: Before: db.restaurants.getIndexes() -> return 1 object

3) db.restaurants.createIndex({restaurant_id:1}, { unique: true }) 	Before: Documents Examined:25359	After: Documents Examined:1

4) db.restaurants.createIndex({cuisine:1},{ partialFilterExpression:{borough: "Staten Island"}})	Result: Query { borough: "Queens", cuisine: "Pizza" } and { borough: "Staten Island", name: "Bagel Land" } – does not use index (Documents Examined:25359)
																											Query { borough: "Staten Island", cuisine: "American" }	-	uses index  (Documents Examined:244)

5) db.restaurants.createIndex({'grades.8.score':1})		Result: Before: Documents Examined:25359 	After: Documents Examined:2


# Front-Camp-Mentoring	Mongo DB Part2

## in the new "command line"

run: mongod --dbpath ./db
run: mongoimport.exe -d frontcamp -c airlines --type csv --headerline airlines.csv
run: mongorestore -d frontcamp -c enron ./enron/messages.bson
run: "mongo" and then "use frontcamp"

# Task 3:
1)	db.airlines.aggregate([{$group: {_id: "$class", total: { $sum: 1 }}},{$project: {class: "$_id", total: "$total", _id: 0}}])
Results:
{ "class" : "F", "total" : 140343 }
{ "class" : "L", "total" : 23123 }
{ "class" : "P", "total" : 5683 }
{ "class" : "G", "total" : 17499 }


2)	db.airlines.aggregate([{$match : {destCountry : {$ne:"United States"}}},{$group: {_id: "$destCity", avgPassengers: {$avg: "$passengers"}} }, {$sort:{avgPassengers:-1}}, {$limit : 3}, {$project: {avgPassengers:"$avgPassengers",city: "$_id", _id: 0}}])
Results:
{ "avgPassengers" : 8052.380952380952, "city" : "Abu Dhabi, United Arab Emirates" }
{ "avgPassengers" : 7176.596638655462, "city" : "Dubai, United Arab Emirates" }
{ "avgPassengers" : 7103.333333333333, "city" : "Guangzhou, China" }


3)	db.airlines.aggregate([{$match : {destCountry : "Latvia"}},{ $group : { _id : "$destCountry", carriers: { $addToSet: "$carrier" } } }])	
Results:
{ "_id" : "Latvia", "carriers" : [ "Uzbekistan Airways", "Blue Jet SP Z o o", "JetClub AG" ] }


4) SUM:	db.airlines.aggregate([{$match : {originCountry : "United States", destCountry: {$in: ["Greece", "Spain", "Italy"]}}},{$group: {_id: "$carrier", total: {$sum: "$passengers"}} }, {$sort:{total:-1}}, {$limit : 10}, { $skip : 3 }])

Results:
{ "_id" : "Compagnia Aerea Italiana", "total" : 280256 }
{ "_id" : "United Air Lines Inc.", "total" : 229936 }
{ "_id" : "Emirates", "total" : 100903 }
{ "_id" : "Air Europa", "total" : 94968 }
{ "_id" : "Meridiana S.p.A", "total" : 20308 }
{ "_id" : "Norwegian Air Shuttle ASA", "total" : 13344 }
{ "_id" : "VistaJet Limited", "total" : 183 }



5) 	db.airlines.aggregate([{$match : {originCountry:"United States"}}, {$group: {_id: {originCity:"$originCity",originState:"$originState"}, total: {$sum: "$passengers"}} }, {$sort:{"_id.originState":1,total:-1 }}, {$group: {_id:"$_id.originState", originCity:{$first:"$_id.originCity"}, total:{$max:"$total"}} },{$sort:{"_id":1}}, {$project: {_id:0, totalPassengers:"$total", location:{state:"$_id", city:"$originCity"}}}, {$limit : 5}])
Results:
{ "totalPassengers" : 760120, "location" : { "state" : "Alabama", "city" : "Birmingham, AL" } }
{ "totalPassengers" : 1472404, "location" : { "state" : "Alaska", "city" : "Anchorage, AK" } }
{ "totalPassengers" : 13152753, "location" : { "state" : "Arizona", "city" : "Phoenix, AZ" } }
{ "totalPassengers" : 571452, "location" : { "state" : "Arkansas", "city" : "Little Rock, AR" } }
{ "totalPassengers" : 23701556, "location" : { "state" : "California", "city" : "Los Angeles, CA" } }
	

	
# Task 4:	
1) db.enron.aggregate([{$unwind:"$headers.To"},{$group:{_id : "$_id", to_unic:{$addToSet: "$headers.To"}, from:{$first:"$headers.From"}}}, {$unwind:"$to_unic"},  {$group:{_id : {from : "$from", to: "$to_unic"}, total: { $sum: 1 }}},{$sort:{"total":-1}}, {$limit : 1}])
{ "_id" : { "from" : "susan.mara@enron.com", "to" : "jeff.dasovich@enron.com" }, "total" : 750 }