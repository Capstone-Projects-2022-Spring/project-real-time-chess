import { Db, MongoClient, ServerApiVersion } from 'mongodb';

export default class DatabaseConnector {
    private static URI =
        'mongodb+srv://admin:admin@cluster0.eu8bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    private static client: MongoClient | undefined;

    private static _database?: Db;

    static open() {
        DatabaseConnector.client = new MongoClient(DatabaseConnector.URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });

        DatabaseConnector.client.connect(err => {
            if (err) {
                console.error(err);
                throw err;
            } else if (DatabaseConnector.client) {
                DatabaseConnector._database = DatabaseConnector.client.db('RTC');
                console.log('Connected to database');
            } else {
                console.error('Could not connect to database');
            }
        });
    }

    static close() {
        if (DatabaseConnector.client) DatabaseConnector.client.close();
    }

    static get database(): Db | undefined {
        return DatabaseConnector._database;
    }
}
