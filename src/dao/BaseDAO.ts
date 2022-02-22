import * as Mongo from 'mongodb';
import DatabaseConnector from './DatabaseConnector';

export default abstract class BaseDAO<Schema extends Mongo.Document> {
    abstract get collectionName(): string;

    public async insertOne(document: Schema): Promise<void> {
        return new Promise((resolve, reject) => {
            this.collection!.insertOne(document)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    public async findOne(filter: Mongo.Filter<Schema>): Promise<Mongo.WithId<Schema>> {
        return new Promise((resolve, reject) => {
            this.collection!.findOne(filter)
                .then(doc => resolve(doc as Mongo.WithId<Schema>))
                .catch(err => reject(err));
        });
    }

    get collection(): Mongo.Collection | undefined {
        return DatabaseConnector.database
            ? DatabaseConnector.database.collection(this.collectionName)
            : undefined;
    }
}
