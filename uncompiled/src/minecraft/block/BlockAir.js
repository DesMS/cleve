class BlockAir {
	static #texture;
	static get texture() {
		return this.#texture;
	}
	static set texture(texture) {
		this.#texture = texture;
	}
	static get id() {
		return 0;
	}
	static get getRenderType() {
		return EnumBlockRenderType.INVISIBLE;
	}
	static get getCollisionBoundingBox() {
		return null;
	}
	static get isOpaqueCube() {
		return false;
	}
	static get canCollideCheck() {
		return false;
	}
	static get isReplaceable() {
		return true;
	}
	static get getBlockFaceShape() {
		return BlockFaceShape.UNDEFINED;
	}
	static get isNatural() {
		return true;
	}
}