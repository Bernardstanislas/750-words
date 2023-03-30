import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;

const getTestClient = (): Client => {
	let storedContent: string;

	return {
		store: async (content: string) => {
			storedContent = content;
		},
		get: async () => {
			if (!storedContent) {
				return '';
			}
			return storedContent;
		}
	};
};

const getProductionClient = (): Client => {
	const mongoClient = new MongoClient(uri);
	const database = mongoClient.db('750words');
	const journals = database.collection('journals');

	return {
		store: async (content: string) => {
			await journals.updateOne({}, { $set: { content } }, { upsert: true });
		},
		get: async () => {
			const journal = await journals.findOne({});
			if (!journal) {
				throw new Error('No journal found');
			}
			return journal.content;
		}
	};
};

const client: Client =
	import.meta.env.MODE === 'test' || (process && process.env.MODE === 'test')
		? getTestClient()
		: getProductionClient();

export type Client = {
	store: (content: string) => Promise<void>;
	get: () => Promise<string>;
};

export default client;
