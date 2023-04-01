let subtle: SubtleCrypto;

if (globalThis.crypto) {
	subtle = globalThis.crypto.subtle;
} else {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const crypto = require('crypto');
	subtle = crypto.webcrypto.subtle;
}

const encryption = {
	name: 'RSA-OAEP'
};
const algorithm = {
	...encryption,
	modulusLength: 4096,
	publicExponent: new Uint8Array([1, 0, 1]),
	hash: 'SHA-256'
};

export const generateKeyPair = async () => {
	const keyPair = await subtle.generateKey(algorithm, true, ['encrypt', 'decrypt']);
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

export const keyPairToString = async (keyPair: CryptoKeyPair) => {
	const publicKey = await subtle.exportKey('jwk', keyPair.publicKey);
	const privateKey = await subtle.exportKey('jwk', keyPair.privateKey);
	return JSON.stringify({ publicKey, privateKey });
};

export const stringToKeyPair = async (keyPair: string) => {
	const { publicKey, privateKey } = JSON.parse(keyPair);
	return <CryptoKeyPair>{
		publicKey: await subtle.importKey('jwk', publicKey, algorithm, true, ['encrypt']),
		privateKey: await subtle.importKey('jwk', privateKey, algorithm, true, ['decrypt'])
	};
};

export const keyId = async (publicKey: CryptoKey) => {
	const jwk = await subtle.exportKey('jwk', publicKey);
	if (!jwk.n) {
		throw new Error('No n in jwk');
	}
	return jwk.n.substring(0, 10);
};
