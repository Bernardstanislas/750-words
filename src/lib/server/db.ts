import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;

const client: Client =
	import.meta.env.MODE === 'test'
		? {
				store: (content: string) => Promise.resolve()
		  }
		: {
				store: async (content: string) => {
					const mongoClient = new MongoClient(uri);
					const database = mongoClient.db('750words');
					const journals = database.collection('journals');
					await journals.updateOne({}, { $set: { content } }, { upsert: true });
				}
		  };

export type Client = {
	store: (content: string) => Promise<void>;
};

export default client;
