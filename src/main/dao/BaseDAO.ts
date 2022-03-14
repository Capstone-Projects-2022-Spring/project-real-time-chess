import * as Mongo from 'mongodb';
import DatabaseConnector from './DatabaseConnector';

/**
 * Base DAO class. All other DAOs use this elementary class.
 */
export default abstract class BaseDAO<Schema extends Mongo.Document> {
    /**
     * The collection name which the DAO accesses
     *
     * @readonly
     * @abstract
     * @type {string}
     * @memberOf BaseDAO
     */
    abstract get collectionName(): string;

    /**
     * Inserts a single document to the collection specified
     * by this.collectionName.
     *
     * @param {Schema} document The document to insert.
     * @returns {Promise<void>} A promise resolving on successful insertion
     * to the database.
     *
     * @memberOf BaseDAO
     */
    public async insertOne(document: Schema): Promise<void> {
        return new Promise((resolve, reject) => {
            this.collection!.insertOne(document)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    /**
     * Finds a single document in the collection specified by this.collectionName.
     *
     * @param {Mongo.Filter<Schema>} filter The filter used to find the document.
     * @returns {Promise<Mongo.WithId<Schema>>} Resolve when the first document
     * matching the filter query is found.
     *
     * @memberOf BaseDAO
     */
    public async findOne(filter: Mongo.Filter<Schema>): Promise<Mongo.WithId<Schema>> {
        return new Promise((resolve, reject) => {
            this.collection!.findOne(filter)
                .then(doc => resolve(doc as Mongo.WithId<Schema>))
                .catch(err => reject(err));
        });
    }

    /**
     * Updates a single document in the collection specified by this.collectionName.
     *
     * @param {Mongo.Filter<Schema>} filter The filter use to find the document.
     * @param {Partial<Schema>} update The record which includes the fields to update
     * and their new value.
     * @returns {Promise<void>} The promise resolves when the update is successful.
     *
     * @memberOf BaseDAO
     */
    public async updateOne(filter: Mongo.Filter<Schema>, update: Partial<Schema>): Promise<void> {
        return new Promise((resolve, reject) => {
            this.collection!.updateOne(filter, update)
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    /**
     * Gets the Mongo Collection object for the collection specified by this.collectionName.
     *
     * @readonly
     * @type {(Mongo.Collection | undefined)}
     * @memberOf BaseDAO
     */
    get collection(): Mongo.Collection | undefined {
        return DatabaseConnector.database
            ? DatabaseConnector.database.collection(this.collectionName)
            : undefined;
    }
}
