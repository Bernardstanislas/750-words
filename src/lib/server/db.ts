import type { KeyId } from '$lib/crypto';
import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;

const getTestClient = (): Client => {
	const storedContents: Record<KeyId, Record<string, string>> = {};

	return {
		store: async (keyId: KeyId, date: Date, content: string) => {
			storedContents[keyId] = {
				...storedContents[keyId],
				[date.toISOString()]: content
			};
		},
		get: async (keyId: KeyId, date: Date) => {
			return (storedContents[keyId] && storedContents[keyId][date.toISOString()]) || '';
		}
	};
};

const getProductionClient = (): Client => {
	const mongoClient = new MongoClient(uri);
	const database = mongoClient.db('750words');
	const journals = database.collection('journals');

	return {
		store: async (keyId: KeyId, date: Date, content: string) => {
			await journals.updateOne({ keyId, date }, { $set: { content } }, { upsert: true });
		},
		get: async (keyId: KeyId, date: Date) => {
			const journal = await journals.findOne({ keyId, date });
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
	store: (keyId: KeyId, date: Date, content: string) => Promise<void>;
	get: (keyId: KeyId, date: Date) => Promise<string>;
};

export default client;
