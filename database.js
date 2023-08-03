const {MongoClient} = require("mongodb");

class PrivateSingleton {
    constructor() {
        const connectionString = 'mongodb+srv://root:root@m1p10android.hi2frdi.mongodb.net/?retryWrites=true&w=majority'
        let cl;
        async function connectToDB(){
            const client = await MongoClient.connect(connectionString, { useUnifiedTopology: true });
            cl = client;
            return cl;
        }
        let result = connectToDB();
        this.client = result;
    }
}
class Database {
    constructor() {
    }
    static getInstance() {
        if (!Database.db) {
            Database.db = new PrivateSingleton();
        }
        return Database.db.client.then(client => {
            return client.db('dagostagram');
        });
    }

    static getMongoClient() {
        if (!Database.db) {
            Database.db = new PrivateSingleton();
        }
        return Database.db.client;
    }
}
module.exports = Database;
