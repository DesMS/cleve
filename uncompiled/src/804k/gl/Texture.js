class Texture {
	static init(cb) {
		// BlockAir.texture = new Texture(``); NO TEXTURE
		// BlockStone.texture = new Texture(`assets/minecraft/textures/blocks/dirt.png`).texture;
		var tex;
		var tex2;
		tex = new Texture(`assets/minecraft/textures/blocks/stone.png`, () => {
			BlockStone.texture = tex.texture;
			tex2 = new Texture(`assets/minecraft/textures/blocks/bedrock.png`, () => {
				BlockBedrock.texture = tex2.texture;
				setTimeout(cb);
			});
		});
	}
	#texture;
	get texture() {
		return this.#texture;
	}
	constructor(location, cb) {
		const texture = Minecraft.gl.createTexture();
		Minecraft.gl.bindTexture(Minecraft.gl.TEXTURE_2D, texture);
		Minecraft.gl.texImage2D(Minecraft.gl.TEXTURE_2D, 0, Minecraft.gl.RGBA, 16, 16, 0, Minecraft.gl.RGBA, Minecraft.gl.UNSIGNED_BYTE, null);
		const image = new Image();
		image.onload = () => {
			Minecraft.gl.bindTexture(Minecraft.gl.TEXTURE_2D, texture);
			Minecraft.gl.texImage2D(Minecraft.gl.TEXTURE_2D, 0, Minecraft.gl.RGBA, Minecraft.gl.RGBA, Minecraft.gl.UNSIGNED_BYTE, image);
			if ((image.width & (image.width - 1)) == 0 && (image.height & (image.height - 1)) == 0) {
				Minecraft.gl.generateMipmap(Minecraft.gl.TEXTURE_2D);
			}
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_WRAP_S, Minecraft.gl.CLAMP_TO_EDGE);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_WRAP_T, Minecraft.gl.CLAMP_TO_EDGE);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_WRAP_R, Minecraft.gl.CLAMP_TO_EDGE);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_COMPARE_MODE, Minecraft.gl.COMPARE_REF_TO_TEXTURE);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_MIN_FILTER, Minecraft.gl.NEAREST_MIPMAP_NEAREST); // NEAREST_MIPMAP_NEAREST
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_MAG_FILTER, Minecraft.gl.NEAREST);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_COMPARE_FUNC, Minecraft.gl.ALWAYS);
			this.#texture = texture;
			setTimeout(cb);
			return;
		};
		image.src = location.toString();
		return;
	}
}