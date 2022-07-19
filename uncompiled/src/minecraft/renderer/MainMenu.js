class MainMenu {
	static get id() {
		return 0;
	}
	static #skybox1;
	static #skybox2;
	static #skybox3;
	static #skybox4;
	static #skybox5;
	static #skybox6;
	static #grad;
	static #grad2;
	static #survb;
	static #multb;
	static #optib;
	static #quitb;
	static #start;
	static init() {
		this.#skybox1 = new Cube(new Vec3(0, 0, -1));
		this.#skybox2 = new Cube(new Vec3(0, 0, 1));
		this.#skybox3 = new Cube(new Vec3(0, -1, 0));
		this.#skybox4 = new Cube(new Vec3(0, 1, 0));
		this.#skybox5 = new Cube(new Vec3(-1, 0, 0));
		this.#skybox6 = new Cube(new Vec3(1, 0, 0));
		this.#skybox1.texture = Texture.pan[0];
		this.#skybox2.texture = Texture.pan[2];
		this.#skybox3.texture = Texture.pan[4];
		this.#skybox4.texture = Texture.pan[5];
		this.#skybox5.texture = Texture.pan[3];
		this.#skybox6.texture = Texture.pan[1];
		this.#grad = Minecraft.gl2D.createLinearGradient(0, Minecraft.height, 0, 0);
		this.#grad2 = Minecraft.gl2D.createLinearGradient(0, Minecraft.height, 0, 0);
		this.#grad.addColorStop(0, `rgba(255, 255, 255, ${128 / 255})`);
		this.#grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
		this.#grad2.addColorStop(0, `rgba(0, 0, 0, 0)`);
		this.#grad2.addColorStop(1, `rgba(0, 0, 0, ${128 / 255}`);
		this.#survb = new GuiButton(0, new Vec2(Minecraft.width / 2 - (100 * (FontRenderer.fontHeight / 9)), Minecraft.height / 4 + 48), 200, 20, Translation.getString(`menu.singleplayer`), () => {
			Minecraft.camera.updatePosRot(new Vec3(0, 0, 0), new Vec3(0, 0, 0));
			Minecraft.renderid = InGame;
			return;
		});
		this.#multb = new GuiButton(0, new Vec2(Minecraft.width / 2 - (100 * (FontRenderer.fontHeight / 9)), Minecraft.height / 4 + 48 + (24 * (FontRenderer.fontHeight / 9))), 200, 20, Translation.getString(`menu.multiplayer`), () => {
			return;
		});
		this.#optib = new GuiButton(0, new Vec2(Minecraft.width / 2 - (100 * (FontRenderer.fontHeight / 9)), Minecraft.height / 4 + 48 + ((72 + 12) * (FontRenderer.fontHeight / 9))), 98, 20, Translation.getString(`menu.options`), () => {
			Minecraft.renderid = MainOptionsMenu;
			return;
		});
		this.#quitb = new GuiButton(0, new Vec2(Minecraft.width / 2 - (100 * (FontRenderer.fontHeight / 9)) + (102 * (FontRenderer.fontHeight / 9)), Minecraft.height / 4 + 48 + ((72 + 12) * (FontRenderer.fontHeight / 9))), 98, 20, Translation.getString(`menu.quit`), () => {
			Minecraft.running = false;
			return;
		});
		this.#start = performance.now();
		return;
	}
	static frame() {
		var g = (performance.now() - this.#start) / 3.0;
		Minecraft.camera.updatePosRot(new Vec3(0, 0, 0), new Vec3(Math.sin(g / 400.0) * 25.0 + 20.0, g * 0.1, 180));
		GL.add(this.#skybox1);
		GL.add(this.#skybox2);
		GL.add(this.#skybox3);
		GL.add(this.#skybox4);
		GL.add(this.#skybox5);
		GL.add(this.#skybox6);
		Minecraft.gl2D.fillStyle = this.#grad;
		Minecraft.gl2D.fillRect(0, 0, Minecraft.width, Minecraft.height);
		Minecraft.gl2D.fillStyle = this.#grad2;
		Minecraft.gl2D.fillRect(0, 0, Minecraft.width, Minecraft.height);
		this.#survb.drawButton(false);
		this.#multb.drawButton(true);
		this.#optib.drawButton(false);
		this.#quitb.drawButton(false);
		FontRenderer.drawCenteredString(Minecraft.splashText, new Vec2(Minecraft.width / 2 + 90 + FontRenderer.fontHeight, 78), new Vec3(255, 255, 0));
		FontRenderer.drawString(`Copyright Mojang AB. Do not distribute!`, new Vec2(2, Minecraft.height - 4 - (FontRenderer.fontHeight - 9)), new Vec3(255, 255, 255));
		FontRenderer.drawString(`Minecraft 1.12.2 release`, new Vec2(2, Minecraft.height - 4 - (FontRenderer.fontHeight + 1) - (FontRenderer.fontHeight - 9)), new Vec3(255, 255, 255));
		FontRenderer.drawString(`Cleve v0.0.1 PRA 1`, new Vec2(2, Minecraft.height - 4 - ((FontRenderer.fontHeight + 1) * 2) - (FontRenderer.fontHeight - 9)), new Vec3(255, 255, 255));
		// FontRenderer.drawString(`Cleve v0.0.1 PRA 1`, new Vec2(2, Minecraft.height - 2), new Vec3(255, 255, 255));
	}
}