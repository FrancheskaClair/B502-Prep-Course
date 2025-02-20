async function addManyFunc(db) {

    await (

        db.cruise.insertMany(
        [
            {
                name: "interior cabin",
                accomodates: 2,
                price: 2000,
                description: "A simple room with all the basic necessities", 
                rooms_available: 100,
                isAvailable: true
            },
            {   
                name: "balcony cabin",
                accomodates: 2,
                price: 7000,
                description: "A room with a queen sized bed perfect for a simple celebration.", 
                rooms_available: 50,
                isAvailable: true
            },
            {   
                name: "executive suites",
                accomodates: 4,
                price: 9000,
                description: "A room designed for those who want to enjoy the cruise in luxury and style.", 
                rooms_available: 25,
                isAvailable: true
            }

         ]

     );


    );

   return(db);

};


async function findRoomPriceGreaterThan(db) {
    return await (

        db.cruise.find(
        { price: { $gt: 8000} }, 
        {
            name: 1,
            price: 1,
            rooms_available: 1,
            _id: 0
        }

        )

    );
};

function findRoomPriceLessThan(db) {

   db.cruise.find(
        { price: { $gt: 5000} }, 
        {
            name: 1,
            price: 1,
            rooms_available: 1,
            _id: 0
        }

        )

};

function findRoomByPriceAndRoomCount(db) {

   db.cruise.find(
        { 
            price: { $gt: 10000},
            rooms_available: { $gte: 20},

        }, 
        {
            name: 1,
            price: 1,
            rooms_available: 1,
            _id: 0
        }

        )

};

async function findRoomByPriceOrRoomCount(db) {
    return await(

            db.cruise.find(
                { 
                    $or: [
                        { price: { $lt: 10000} },
                        { rooms_available: { $lte: 30} },
                    ]
                },
                {
                    name: 1,
                    price: 1,
                    rooms_available: 1,
                    _id: 0 
                }

                )

        );

};

async function findRoomByAccommodation(db) {
    return await (

        db.cruise.find(
            {
                accomodates: { $lte: 3 },
                price: { $lt: 8000 },
            },
            {
                name: 1,
                accomodates: 1,
                price: 1,
                _id: 0
            }
            )

    );

};

async function findRoomByAccommodationAndPrice(db) {
    return await (

        db.cruise.find(
            {
                accomodates: { $gte: 4 },
                price: { $lt: 8000 },
            },
            {
                name: 1,
                accomodates: 1,
                price: 1,
                _id: 0
            }
            )

    );
};

async function findRoomByInName(db) {
    return await (

        db.cruise.find(
            { name: { $in: ["ocean view cabin", "executive suites"] }},
            { id: 0}
        )

    );
};

async function findRoomByAccommodationNotEqualTo(db) {
    return await (

        db.cruise.find(
            {  accomodates: { $ne: 5} },
            {
                name: 1,
                accomodates: 1,
                _id: 0
            }
        )

    );
};