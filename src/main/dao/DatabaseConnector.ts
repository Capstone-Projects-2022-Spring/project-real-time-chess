import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import Logger from '../Logger';

export default class DatabaseConnector {
    private static URI =
        'mongodb+srv://admin:admin@cluster0.eu8bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    private static client: MongoClient | undefined;

    private static _database?: Db;

    /**
     * Opens a connection to the database.
     */
    static open() {
        DatabaseConnector.client = new MongoClient(DatabaseConnector.URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        });

        DatabaseConnector.client.connect(err => {
            if (err) {
                Logger.error('Could not connect to database. Error below:');
                Logger.error(err);
                throw err;
            } else if (DatabaseConnector.client) {
                DatabaseConnector._database = DatabaseConnector.client.db('RTC');
                Logger.info('Connected to database');
            } else {
                Logger.error('Could not connect to database. No error provided.');
            }
        });
    }

    /**
     * Closes the database connection.
     */
    static close() {
        if (DatabaseConnector.client) DatabaseConnector.client.close();
    }

    /**
     * The object which allows queries to the database.
     *
     * @readonly
     */
    static get database(): Db | undefined {
        return DatabaseConnector._database;
    }
}
