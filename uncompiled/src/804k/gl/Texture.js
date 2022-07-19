class Texture {
	static init(cb) {
		// BlockAir.texture = new Texture(``); NO TEXTURE
		// BlockStone.texture = new Texture(`assets/minecraft/textures/blocks/dirt.png`).texture;
		var t0, t1, t2, t3, t4, t5, t6, t7, t8;
		t0 = new Texture(`assets/minecraft/textures/blocks/stone.png`, () => {
			BlockStone.texture = t0.texture;
			t1 = new Texture(`assets/minecraft/textures/blocks/bedrock.png`, () => {
				BlockBedrock.texture = t1.texture;
				t2 = new Texture(`assets/minecraft/textures/gui/title/background/panorama_0.png`, () => {
					this.#pan[0] = t2.texture;
					t3 = new Texture(`assets/minecraft/textures/gui/title/background/panorama_1.png`, () => {
						this.#pan[1] = t3.texture;
						t4 = new Texture(`assets/minecraft/textures/gui/title/background/panorama_2.png`, () => {
							this.#pan[2] = t4.texture;
							t5 = new Texture(`assets/minecraft/textures/gui/title/background/panorama_3.png`, () => {
								this.#pan[3] = t5.texture;
								t6 = new Texture(`assets/minecraft/textures/gui/title/background/panorama_4.png`, () => {
									this.#pan[4] = t6.texture;
									t7 = new Texture(`assets/minecraft/textures/gui/title/background/panorama_5.png`, () => {
										this.#pan[5] = t7.texture;
										const optbg = new Image();
										optbg.onload = () => {
											this.#optbg = optbg;
											const widgets = new Image();
											widgets.onload = () => {
												this.#widgets = widgets;
												setTimeout(cb);
											}
											widgets.src = `assets/minecraft/textures/gui/widgets.png`.toString();
										}
										optbg.src = `assets/minecraft/textures/gui/options_background.png`;
									}, 256, Minecraft.gl.LINEAR, Minecraft.gl.LINEAR_MIPMAP_LINEAR);
								}, 256, Minecraft.gl.LINEAR, Minecraft.gl.LINEAR_MIPMAP_LINEAR);
							}, 256, Minecraft.gl.LINEAR, Minecraft.gl.LINEAR_MIPMAP_LINEAR);
						}, 256, Minecraft.gl.LINEAR, Minecraft.gl.LINEAR_MIPMAP_LINEAR);
					}, 256, Minecraft.gl.LINEAR, Minecraft.gl.LINEAR_MIPMAP_LINEAR);
				}, 256, Minecraft.gl.LINEAR, Minecraft.gl.LINEAR_MIPMAP_LINEAR);
			}, 16);
		}, 16);
	}
	static #widgets;
	static #pan = [];
	static #optbg;
	static get optbg() {
		return this.#optbg;
	}
	static get widgets() {
		return this.#widgets;
	}
	static get pan() {
		return this.#pan;
	}
	#texture;
	get texture() {
		return this.#texture;
	}
	constructor(location, cb, size, type = Minecraft.gl.NEAREST, typemip = Minecraft.gl.NEAREST_MIPMAP_NEAREST) {
		const texture = Minecraft.gl.createTexture();
		Minecraft.gl.bindTexture(Minecraft.gl.TEXTURE_2D, texture);
		Minecraft.gl.texImage2D(Minecraft.gl.TEXTURE_2D, 0, Minecraft.gl.RGBA, size, size, 0, Minecraft.gl.RGBA, Minecraft.gl.UNSIGNED_BYTE, null);
		const image = new Image();
		image.onload = () => {
			Minecraft.gl.bindTexture(Minecraft.gl.TEXTURE_2D, texture);
			Minecraft.gl.texImage2D(Minecraft.gl.TEXTURE_2D, 0, Minecraft.gl.RGBA, Minecraft.gl.RGBA, Minecraft.gl.UNSIGNED_BYTE, image);
			if ((image.width & (image.width - 1)) == 0 && (image.height & (image.height - 1)) == 0) {
				Minecraft.gl.generateMipmap(Minecraft.gl.TEXTURE_2D);
				Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_MIN_FILTER, typemip);
			} else {
				Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_MIN_FILTER, type);
			}
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_MAG_FILTER, type);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_WRAP_S, Minecraft.gl.CLAMP_TO_EDGE);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_WRAP_T, Minecraft.gl.CLAMP_TO_EDGE);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_WRAP_R, Minecraft.gl.CLAMP_TO_EDGE);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_COMPARE_MODE, Minecraft.gl.COMPARE_REF_TO_TEXTURE);
			Minecraft.gl.texParameteri(Minecraft.gl.TEXTURE_2D, Minecraft.gl.TEXTURE_COMPARE_FUNC, Minecraft.gl.LEQUAL);
			this.#texture = texture;
			setTimeout(cb);
			return;
		};
		image.src = location.toString();
		return;
	}
}