class Chunk {
	#blocks = [];
	#none = [];
	#xyz = [];
	#pos = new Vec2();
	#loaded = false;
	get blocks() {
		return this.#loaded ? this.#blocks : this.#none;
	}
	get pos() {
		return this.#pos; // Not setting
	}
	setBlock(pos = new Vec3(0, 0, 0), block = 0) {
		if (pos.y == undefined || pos.x == undefined || pos.z == undefined || block == undefined) {
			return;
		}
		if (pos.y > 256 || pos.y < 0 || pos.x > 16 || pos.x < 0 || pos.z > 16 || pos.z < 0) {
			return;
		}
		block = parseInt(block);
		if (isNaN(block)) {
			return;
		}
		if (block == Block.AIR) {
			return;
		} else if (block == Block.STONE) {
			this.#xyz[pos.y][pos.x][pos.z] = new Cube(new Vec3(pos.x + (this.#pos.x * 16), pos.y, pos.z + (this.#pos.y * 16)));
			this.#xyz[pos.y][pos.x][pos.z].texture = BlockStone.texture;
		} else if (block == Block.BEDROCK) {
			this.#xyz[pos.y][pos.x][pos.z] = new Cube(new Vec3(pos.x + (this.#pos.x * 16), pos.y, pos.z + (this.#pos.y * 16)));
			this.#xyz[pos.y][pos.x][pos.z].texture = BlockBedrock.texture;
		} else {
			return;
		}
	}
	load() {
		this.#loaded = true;
		return;
	}
	unload() {
		this.#loaded = false;
		return;
	}
	static calculate(renderdistance, setfunc = `load`, last) {
		var arr = [];
		if (last == undefined) {
			for (var x = 0; x < renderdistance + 1; x += 1) {
				for (var z = 0; z < renderdistance + 1; z += 1) {
					var a = arr.length;
					arr[a] = new Chunk(new Vec2(x - 1, z - 1));
					arr[a].generate();
					arr[a].load();
					arr[a].update();
				}
			}
		} else {
			arr = last;
			/*for (var x = 0; x < renderdistance + 1; x += 1) {
				for (var z = 0; z < renderdistance + 1; z += 1) {
					var c = arr[x + z];
					if (c.pos.x * 16 < Minecraft.camera.Matrix[8] * -1 || c.pos.z * 16 < Minecraft.camera.z) {
						// c.unload();
					}
				}
			}*/
		}
		return arr;
	}
	generate() {
		for (var x = 0; x < 16; x += 1) {
			for (var z = 0; z < 16; z += 1) {
				this.setBlock(new Vec3(x, 0, z), Block.BEDROCK);
			}
		}
	}
	update() {
		this.#blocks = [];
		for (var y = 0; y < this.#xyz.length; y += 1) {
			for (var x = 0; x < this.#xyz[y].length; x += 1) {
				for (var z = 0; z < this.#xyz[y][x].length; z += 1) {
					this.#blocks[this.#blocks.length] = this.#xyz[y][x][z];
				}
			}
		}
	}
	constructor(pos = new Vec2(0, 0)) {
		for (var y = 0; y < 256; y += 1) {
			this.#xyz[y] = [];
			for (var x = 0; x < 16; x += 1) {
				this.#xyz[y][x] = [];
				for (var z = 0; z < 16; z += 1) {
					this.#xyz[y][x][z] = new Cube(new Vec3(x + (pos.x * 16), y, z + (pos.y * 16)));
					this.#none[this.#none.length] = new Cube(new Vec3(x + (pos.x * 16), y, z + (pos.y * 16)));
				}
			}
		}
		this.#pos = pos;
	}
}