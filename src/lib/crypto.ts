import crypto from 'crypto';

const subtle = crypto.subtle;
const encryption = {
	name: 'RSA-OAEP'
};

export const generateKeyPair = async () => {
	const keyPair = await crypto.subtle.generateKey(
		{
			name: 'RSA-OAEP',
			modulusLength: 4096,
			publicExponent: new Uint8Array([1, 0, 1]),
			hash: 'SHA-256'
		},
		true,
		['encrypt', 'decrypt']
	);
	return keyPair;
};

export const encryptContent = async (content: string, publicKey: CryptoKey) => {
	const encoded = new TextEncoder().encode(content);
	return subtle.encrypt(encryption, publicKey, encoded);
};

export const decryptContent = async (encryptedContent: ArrayBuffer, privateKey: CryptoKey) => {
	const decryptedBytes = await subtle.decrypt(encryption, privateKey, encryptedContent);
	return new TextDecoder().decode(decryptedBytes);
};
