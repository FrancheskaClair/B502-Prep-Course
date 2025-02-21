async function insertSales(db){
	return await (

		db.sales.insertMany(
		[
			{
				product: "A",
    			category: "Electronics",
    			quantity: 2, 
    			price: 100
			},
			{
				product: "B",
    			category: "Clothing",
    			quantity: 3,
    			price: 50
			},
			{
				product: "C",
    			category: "Electronics",
    			quantity: 1,
    			price: 200
			}
		]

			)
	)
}
async function insertCustomers(db){
	return await (

		db.customers.insertMany(
		[
			{
				name: "John",
    			age: 35,
    			gender: "Male",
    			region: "North"
			},
			{
				name: "Alice",
    			age: 28,
    			gender: "Female",
    			region: "South"
			},
			{
				name: "Bob",
    			age: 45,
    			gender: "Male",
    			region: "East"
			}
		]

			)

	)
}


async function totalRevenue(db) {
	return await(

		db.sales.aggregate(
		[   
			{
				$group: {
      			_id: "$category",

      			totalRevenue: { 
      			$sum: { $multiply: ["$quantity", "$price"] }

      		}
      	}}

		])
	);
};

async function revenuePerProduct(db) {
	return await(

		db.sales.aggregate(
			[   
			{
				$group: {
      			_id: "$product",

      			totalRevenue: { 
      			$sum: { $multiply: ["$quantity", "$price"] }

      		}
      	}}

		])
	);
};

async function demographicsByAge(db) {
	return await(

		db.customers.aggregate([
			{$match: {age: { $gte: 20, $lte: 24} }},
			{$group: {_id: null, count: {$sum: 1} } }

			])
	);
};

async function orderAverage(db) {
	return await(

		db.sales.aggregate(
		[
			{
				$group: {
				_id: null,

				averageOrder: {
					$avg: { $multiply: ["$quantity", "$price"] }

				}

				
				}}

			])
	);
};

async function productPopularity(db) {
	return await(
		
		db.sales.aggregate([
  			{
  				$project: {
      			product: 1,
      			category: 1,
      			quantity: 1, 
      			price: 1,    
      
      			orderDate: {
        		$dateFromString: {
          		dateString: "2024-02-01", 
          		format: "%Y-%m-%d"
        			}
      			}
    			}
  			},
  			{
  				$project: {
     			product: 1,
      			category: 1,
      			quantity: 1,
      			price: 1,
     
      			yearMonth: {
        		$dateToString: {
          		format: "%Y-%m",  
          		date: "$orderDate"
        			}
      			}
    			}
  			},
  			{
  				$group: {
      			_id: { product: "$product", yearMonth: "$yearMonth" },  
      			count: { $sum: 1 }  
    			}			
 			},
  			{
  				$sort: {
      			"_id.yearMonth": 1, 
      			"count": -1
    		}
  		}
])


	);
};
