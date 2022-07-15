class BlockBedrock {
	static #texture;
	static get texture() {
		return this.#texture;
	}
	static set texture(texture) {
		this.#texture = texture;
	}
	static get id() {
		return 7;
	}
	static get getRenderType() {
		return EnumBlockRenderType.MODEL;
	}
	static get getCollisionBoundingBox() {
		return null;
	}
	static get isOpaqueCube() {
		return true;
	}
	static get canCollideCheck() {
		return true;
	}
	static get isReplaceable() {
		return false;
	}
	static get getBlockFaceShape() {
		return BlockFaceShape.UNDEFINED;
	}
	static get isNatural() {
		return true;
	}
}