export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
	const binary = String.fromCharCode(...new Uint8Array(buffer));
	return btoa(binary);
};

export const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
	const binaryString = atob(base64);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
};
