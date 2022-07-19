class Obj {
	#pos = new Vec3(0, 0, 0);
	#vertex = [];
	#texture = undefined;
	#buffer = undefined;
	#lastv = [];
	#loaded = false;
	set pos(vec = new Vec3(0, 0, 0)) {
		this.#pos = vec;
		var i = 0;
		this.#vertex = Array.from(this.#vertex, e => {
			var g = i % 3;
			if (g == 0) {
				e += vec.x * 2;
			} else if (g == 1) {
				e += vec.y * 2;
			} else if (g == 2) {
				e += vec.z * 2;
			}
			i += 1;
			return e;
		});
		return;
	}
	set vertex(vertex = {}) {
		this.#vertex = vertex;
		return;
	}
	set texture(texture = {}) {
		this.#texture = texture;
		return;
	}
	set buffer(buffer) {
		this.#buffer = buffer;
		return;
	}
	set lastv(lastv = {}) {
		this.#lastv = lastv;
		return;
	}
	load() {
		this.#loaded = true;
	}
	unload() {
		this.#loaded = false;
	}
	get pos() {
		return this.#pos;
	}
	get vertex() {
		return this.#vertex;
	}
	get texture() {
		return this.#texture;
	}
	get buffer() {
		return this.#buffer;
	}
	get lastv() {
		return this.#lastv;
	}
	get loaded() {
		return this.#loaded;
	}
	scale(scale = new Vec3(1, 1, 1)) {
		var i = 0;
		this.#vertex = Array.from(this.#vertex, e => {
			var g = i % 3;
			if (g == 0) {
				e *= scale.x;
			} else if (g == 1) {
				e *= scale.y;
			} else if (g == 2) {
				e *= scale.z;
			}
			i += 1;
			return e;
		});
		return;
	}
	constructor(pos = new Vec3(0, 0, 0), vertex = []) {
		this.#pos = pos == undefined || typeof pos == `number` ? new Vec3(0, 0, 0) : pos;
		var i = 0;
		this.#vertex = Array.from(vertex, e => {
			var g = i % 3;
			if (g == 0) {
				e += this.#pos.x * 2;
			} else if (g == 1) {
				e += this.#pos.y * 2;
			} else if (g == 2) {
				e += this.#pos.z * 2;
			}
			i += 1;
			return e;
		});
		return;
	}
}