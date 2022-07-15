class Obj {
	#pos = new Vec3(0, 0, 0);
	#vertex = {};
	#texture = undefined;
	set pos(vec = new Vec3(0, 0, 0)) {
		this.#pos = vec;
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
	get pos() {
		return this.#pos;
	}
	get vertex() {
		return this.#vertex;
	}
	get texture() {
		return this.#texture;
	}
	constructor(pos = new Vec3(0, 0, 0), vertex = {}) {
		this.#pos = pos == undefined || typeof pos == `number` ? new Vec3(0, 0, 0) : pos;
		this.#vertex = vertex;
		return;
	}
}