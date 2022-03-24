import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import Logger from '../Logger';

/**
 * The utility class used to connect to the Mongo Database.
 */
class DatabaseConnector {
    /**
     * The MongoDB URI for the RTC database.
     */
    private static URI =
        'mongodb+srv://admin:admin@cluster0.eu8bc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    /**
     * The MongoDB client that is used to access the database. This is provided by the
     * MongoDB driver for NodeJS.
     */
    private static client: MongoClient | undefined;

    /**
     * The database instance which data access objects can use to communicate with the database.
     */
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

export default DatabaseConnector;
