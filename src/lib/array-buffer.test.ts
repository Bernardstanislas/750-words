import { arrayBufferToBase64, base64ToArrayBuffer } from '$lib/array-buffer';
import { describe, it, expect } from 'vitest';

describe('The array buffer utils', () => {
	it('can convert an array buffer to a base64 string and the other way around', () => {
		const buffer = new Uint8Array([23, 56, 78]);
		const base64String = arrayBufferToBase64(buffer.buffer);

		expect(base64String).toBe('FzhO');

		const resultingBuffer = base64ToArrayBuffer(base64String);
		expect(resultingBuffer).toStrictEqual(buffer.buffer);
	});
});
