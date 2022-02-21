import { Collection } from 'mongodb';
import DatabaseConnector from './DatabaseConnector';

export default abstract class BaseDAO {
    abstract get collectionName(): string;

    get collection(): Collection | undefined {
        return DatabaseConnector.database
            ? DatabaseConnector.database.collection(this.collectionName)
            : undefined;
    }
}
