import type { KeyId } from '$lib/crypto';
import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;

const getTestClient = (): Client => {
	const storedContents: Record<KeyId, string> = {};

	return {
		store: async (keyId: KeyId, content: string) => {
			storedContents[keyId] = content;
		},
		get: async (keyId: KeyId) => {
			return storedContents[keyId] || '';
		}
	};
};

const getProductionClient = (): Client => {
	const mongoClient = new MongoClient(uri);
	const database = mongoClient.db('750words');
	const journals = database.collection('journals');

	return {
		store: async (keyId: KeyId, content: string) => {
			await journals.updateOne({ keyId }, { $set: { content } }, { upsert: true });
		},
		get: async (keyId: KeyId) => {
			const journal = await journals.findOne({ keyId });
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
	store: (keyId: KeyId, content: string) => Promise<void>;
	get: (keyId: KeyId) => Promise<string>;
};

export default client;
