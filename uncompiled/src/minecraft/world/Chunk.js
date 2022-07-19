class Chunk {
	static #blocks = [];
	static #xzy = [];
	static get blocks() {
		return this.#blocks;
	}
	static get xzy() {
		return this.#xzy;
	}
	static loadChunk(pos = new Vec2(0, 0)) {
		return;
	}
	static unloadChunk(pos = new Vec2(0, 0)) {
		return;
	}
	static generateChunk(pos = new Vec2(0, 0)) {
		for (var x = 0; x < 16; x += 1) {
			for (var z = 0; z < 16; z += 1) {
				this.setBlock(new Vec3(x + (pos.x * 16), 0, z + (pos.y * 16)), Cube, BlockBedrock.texture);
			}
		}
		for (var x = 0; x < 16; x += 1) {
			for (var z = 0; z < 16; z += 1) {
				this.setBlock(new Vec3(x + (pos.x * 16), 1, z + (pos.y * 16)), Cube, BlockStone.texture);
			}
		}
		return;
	}
	static updateChunk(pos = new Vec2(0, 0)) {
		return;
	}
	static blockAt(pos = new Vec3(0, 0, 0)) {
		try {
			return this.#xzy[pos.x][pos.z][pos.y].texture == undefined || this.#xzy[pos.x][pos.z][pos.y].loaded == false ? false : true;
		} catch (err) {
			return false;
		}
	}
	static getBlock(pos = new Vec3(0, 0, 0)) {
		try {
			return this.#xzy[pos.x][pos.z][pos.y];
		} catch (err) {
			return;
		}
	}
	static setBlock(pos = new Vec3(0, 0, 0), Type = Cube, texture = BlockBedrock.texture) {
		if (pos.y < 0 || pos.y > 256) return;
		if (typeof this.#xzy[pos.x] != `object`) {
			this.#xzy[pos.x] = [];
		}
		if (typeof this.#xzy[pos.x][pos.z] != `object`) {
			this.#xzy[pos.x][pos.z] = [];
		}
		if (typeof this.#xzy[pos.x][pos.z][pos.y] != `object`) {
			this.#xzy[pos.x][pos.z][pos.y] = [];
		}
		this.#xzy[pos.x][pos.z][pos.y] = new Type(pos);
		this.#xzy[pos.x][pos.z][pos.y].texture = texture;
		this.#xzy[pos.x][pos.z][pos.y].load();
		this.#blocks.push(this.#xzy[pos.x][pos.z][pos.y]);
		return;
	}
	static calculate(renderdistance) {
		this.generateChunk(new Vec2(0, 0));
		/*
		this.generateChunk(new Vec2(1, 1));
		this.generateChunk(new Vec2(-1, -1));
		this.generateChunk(new Vec2(0, 1));
		this.generateChunk(new Vec2(0, -1));
		this.generateChunk(new Vec2(1, 0));
		this.generateChunk(new Vec2(-1, 0));
		this.generateChunk(new Vec2(1, -1));
		this.generateChunk(new Vec2(-1, 1));
		// Render distance of 3
		*/
		return;
	}
}