

async function addOneFunc(db) {

    await (

        db.rooms.insertOne({
                name: "interior cabin",
                accomodates: 2,
                price: 2000,
                description: "A simple room with all the basic necessities", 
                rooms_available: 100,
                isAvailable: true
            })

    );


   return(db);

};



async function addManyFunc(db) {

    await (

         db.rooms.insertMany(
        [
            {   
                name: "ocean view cabin",
                accomodates: 4,
                price: 4000,
                description: "A room with a view of the ocean.", 
                rooms_available: 50,
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
            },
            {   
                name: "family cabin",
                accomodates: 6,
                price: 12000,
                description: "A room fit for a small family out on an adventure.", 
                rooms_available: 30,
                isAvailable: true
            }

         ]

     )


    );

   return(db);

};


async function findRoom(db) {
    return await (

        db.rooms.findOne({ name: "ocean view cabin"})

    );
};



function updateOneFunc(db) {
   
    db.rooms.updateOne(
        {name: "balcony cabin"},

        {
            $set: { rooms_available: 0,}
        }
    )

};



async function replaceOneFunc(db) {
    
    db.rooms.replaceOne(
        { name: "balcony cabin"},

         { 
            name: "balcony cabin",
            accomodates: 2,
            price: 7000,
            description: "A room with a queen sized bed perfect for a simple celebration.", 
            rooms_available: 50,
            isAvailable: false
        }
    )

}



async function findOneAndUpdateFunc(db) {
    
    db.rooms.findOneAndUpdate(
        { name: "executive suites" },
        { $set: { isAvailable: false } },
        { returnDocument: "after" }
    )
}



async function deleteOneFunc(db) {

    db.rooms.deleteOne({ name: "executive suites"})

}


function deleteManyFunc(db) {

   db.rooms.deleteMany({ rooms_available: 0})

};


async function findOneAndDeleteFunc(db) {
    
    db.rooms.findOneAndDelete({ name: "interior cabin"})
    
}



