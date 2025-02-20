// [SECTION] MongoDB Aggregation 
// Used to generate manipulated data and perform operations to creae filtered results that helps in analyzing data.

// DB collection 

db.fruits.insertMany([
    {
        name : "Apple",
        color : "Red",
        stock : 20,
        price: 40,
        supplier_id : 1,
        onSale : true,
        origin: [ "Philippines", "US" ]
    },

    {
        name : "Banana",
        color : "Yellow",
        stock : 15,
        price: 20,
        supplier_id : 2,
        onSale : true,
        origin: [ "Philippines", "Ecuador" ]
    },

    {
        name : "Kiwi",
        color : "Green",
        stock : 25,
        price: 50,
        supplier_id : 1,
        onSale : true,
        origin: [ "US", "China" ]
    },

    {
        name : "Mango",
        color : "Yellow",
        stock : 10,
        price: 120,
        supplier_id : 2,
        onSale : false,
        origin: [ "Philippines", "India" ]
    }
]);

// Aggregate method 

// 1. $match operator 
	// is used to pass documents that meet the specified condition(s) to the next pipeines stages/ aggregation process. 
	// Syntax: {$match: {field:value}}

// 2. $group operator 
	// is used to group elements together and field-value pairs using the data from the grouped elements.
	// and usually perform a computation. 
	// Syntax: {$group: {id:"valvue", fieldResult:"valueResult"}}

// $match + $group operator
// Syntax: db.collectionName.aggregate([{$match: {fieldA: valueA}}, {$group:{_id:"$fieldB", result:{operation}}}}])
// $ - 


// Find all products that are on sale and will group the total amount of stocks for all suppliers

// $sum operatoor 
db.fruits.aggregate([
		{$match: {onSale: true}},
		{$group:{_id: "$supplier_id", total: {$sum: "$stock"}}}
	]);

// Field Projection with aggregation 

// $project
	// can be used when aggregating data to include/exclude fields from the returned result.
	// Syntax: {$project: {field: 1/0}}
	// 1 means include the field, 0 means exclud

db.fruits.aggregate([
		{$match: {onSale: true}},
		{$group:{_id: "$supplier_id", total: {$sum: "$stock"}}},
		{$project: {_id:0}}
	]);

// Sorting aggregated results 

// $sort
	// can be used to change the order of aggregated reults
	// -1 value will sort the aggregated results in a reverse order.
	//Syntax: {$sort:{field: 1/-1}}

db.fruits.aggregate([
		{$match: {onSale: true}},
		{$group:{_id: "$supplier_id", total: {$sum: "$stock"}}},
		{$sort: {total: -1}}
	]);

// Aggregating results based on array fields

// $unwind
	// deconstructs an array field from collection or field with an array value to output a result for each element. 
	// Syntax: {$unwind: arrayField}

db.fruits.aggregate([
		{$unwind: "$origin"}
	]);

// Display fruit documents by their origin and the kind of fruits that are supplied
db.fruits.aggregate([
		{$unwind: "$origin"},
		{$group: {_id: "$origin", kinds: {$sum: 1}}}
	]);
