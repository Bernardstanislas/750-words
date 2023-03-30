import type { Actions } from './$types';
import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;

const client = new MongoClient(uri);

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const database = client.db('750words');
		const journals = database.collection('journals');
		await journals.updateOne(
			{},
			{ $set: { content: formData.get('encrypted_journal') } },
			{ upsert: true }
		);
	}
} satisfies Actions;
