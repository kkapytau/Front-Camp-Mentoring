# Front-Camp-Mentoring	Mongo DB

1) Download "Mongo DB" from https://www.mongodb.com/
2) Add to the Path - path to the "bin" folder for mongoDb (like: C:\Program Files\MongoDB\Server\3.6\bin\)
2.1) Create folder db
3) run mongod --dbpath ./db
4) mongoimport --db frontcamp --collection restaurants --file restaurants.json
5) in the new "command line" run "mongo" and then "use frontcamp"

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