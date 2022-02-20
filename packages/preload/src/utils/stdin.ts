import stream from 'stream';
import type { Readable } from 'stream';
import { inherits } from 'util';
import { Buffer } from 'buffer';

class MockStdin extends stream.Readable {
	target: stream.Readable;

	constructor(restoreTarget: stream.Readable) {
		super({
			highWaterMark: 0,
			readable: true,
			writable: false,
		});
		this.target = restoreTarget;
	}
}

function MockData(chunk, encoding) {
	Object.defineProperties(this, {
		data: {
			value: chunk,
			writable: false,
			configurable: false,
			enumerable: false,
		},
		length: {
			get() {
				if (Buffer.isBuffer(chunk)) {
					return chunk.length;
				} else if (typeof chunk === 'string') {
					return chunk.length;
				}

				return 0;
			},
			configurable: false,
			enumerable: false,
		},
		pos: {
			writable: true,
			value: 0,
			configurable: false,
			enumerable: false,
		},
		done: {
			writable: true,
			value: false,
			configurable: false,
			enumerable: false,
		},
		encoding: {
			writable: false,
			value: (typeof encoding === 'string' && encoding) || null,
			configurable: false,
			enumerable: false,
		},
	});
}

MockData.prototype.chunk = function (length) {
	if (
		this.pos <= this.length &&
		(Buffer.isBuffer(this.data) || typeof this.data === 'string')
	) {
		const value = this.data.slice(this.pos, this.pos + length);
		this.pos += length;
		if (this.pos >= this.length) {
			this.done = true;
		}

		return value;
	}

	this.done = true;
	return null;
};

const Readable$emit = stream.Readable.prototype.emit;
MockSTDIN.prototype.emit = function MockSTDINEmit(name) {
	if (name === 'data') {
		this._flags.emittedData = true;
		this._flags.lastChunk = null;
	}

	return Reflect.apply(Readable$emit, this, arguments);
};

MockSTDIN.prototype.send = function MockSTDINWrite(text, encoding) {
	if (Array.isArray(text)) {
		if (arguments.length > 1) {
			throw new TypeError(
				'Cannot invoke MockSTDIN#send(): `encoding` ' +
					'specified while text specified as an array.'
			);
		}

		text = text.join('\n');
	}

	if (Buffer.isBuffer(text) || typeof text === 'string' || text === null) {
		const data = new MockData(text, encoding);
		this._mockData.push(data);
		this._read();
		if (!this._flags.emittedData && this._readableState.length > 0) {
			drainData(this);
		}

		if (text === null) {
			// Trigger an end event synchronously...
			endReadable(this);
		}
	}

	return this;
};

MockSTDIN.prototype.end = function MockSTDINEnd() {
	this.send(null);
	return this;
};

MockSTDIN.prototype.restore = function MockSTDINRestore() {
	Object.defineProperty(process, 'stdin', {
		value: this.target,
		configurable: true,
		writable: false,
	});
	return this;
};

MockSTDIN.prototype.reset = function MockSTDINReset(removeListeners) {
	const state = this._readableState;
	state.ended = false;
	state.endEmitted = false;
	if (removeListeners === true) {
		this.removeAllListeners();
	}

	return this;
};

MockSTDIN.prototype._read = function MockSTDINRead(size) {
	if (size === void 0) size = Number.POSITIVE_INFINITY;
	let count = 0;
	let read = true;
	while (read && this._mockData.length > 0 && count < size) {
		const item = this._mockData[0];
		const leftInChunk = item.length - item.pos;
		const remaining =
			size === Number.POSITIVE_INFINITY ? leftInChunk : size - count;
		const { encoding } = item;
		const toProcess = Math.min(leftInChunk, remaining);
		const chunk = (this._flags.lastChunk = item.chunk(toProcess));

		if (!(encoding === null ? this.push(chunk) : this.push(chunk, encoding))) {
			read = false;
		}

		if (item.done) {
			this._mockData.shift();
		}

		count += toProcess;
	}
};

MockSTDIN.prototype.setRawMode = function MockSTDINSetRawMode(bool) {
	if (typeof bool !== 'boolean')
		throw new TypeError('setRawMode only takes booleans');
	return this;
};

function endReadable(stream) {
	// Synchronously emit an end event, if possible.
	const state = stream._readableState;

	if (state.length === 0) {
		state.ended = true;
		state.endEmitted = true;
		stream.readable = false;
		stream.emit('end');
	}
}

function drainData(stream) {
	const state = stream._readableState;
	const { buffer } = state;
	while (buffer.length > 0) {
		const chunk = buffer.shift();
		if (chunk !== null) {
			state.length -= chunk.length;
			stream.emit('data', chunk);
			stream._flags.emittedData = false;
		}
	}
}
