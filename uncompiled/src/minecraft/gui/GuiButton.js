class GuiButton {
	#x = 0;
	#y = 0;
	#id = 0;
	#wi = 200;
	#hi = 20;
	#cb = () => {};
	#text = ``;
	#enabled = true;
	#visible = true;
	#hovered = false;
	enable() {
		this.#enabled = true;
		return;
	}
	disable() {
		this.#enabled = false;
		return;
	}
	show() {
		this.#visible = true;
		return;
	}
	hide() {
		this.#visible = false;
		return;
	}
	get hovered() {
		return this.#hovered;
	}
	get visible() {
		return this.#visible;
	}
	get enabled() {
		return this.#enabled;
	}
	#down = false;
	drawButton(disabled = false) {
		if (this.#visible) {
			this.#hovered = Mouse.x >= (this.#x - FontRenderer.fontHeight - 9) && Mouse.y >= this.#y && Mouse.x < (this.#x - FontRenderer.fontHeight - 9) + this.#wi && Mouse.y < this.#y + this.#hi;
		}
		Minecraft.gl2D.imageSmoothingEnabled = false;
		if (disabled == true) {
			Minecraft.gl2D.drawImage(Texture.widgets, 0, 46, 200, 20, (this.#x - FontRenderer.fontHeight - 9), this.#y, this.#wi, this.#hi);
			FontRenderer.drawCenteredString(this.#text, new Vec2((this.#x - FontRenderer.fontHeight - 9) + this.#wi / 2, this.#y + (this.#hi - 8) / 2), new Vec3(160, 160, 160));
		} else if (this.#hovered) {
			Minecraft.gl2D.drawImage(Texture.widgets, 0, 86, 200, 20, (this.#x - FontRenderer.fontHeight - 9), this.#y, this.#wi, this.#hi);
			FontRenderer.drawCenteredString(this.#text, new Vec2((this.#x - FontRenderer.fontHeight - 9) + this.#wi / 2, this.#y + (this.#hi - 8) / 2), new Vec3(255, 255, 160));
		} else {
			Minecraft.gl2D.drawImage(Texture.widgets, 0, 66, 200, 20, (this.#x - FontRenderer.fontHeight - 9), this.#y, this.#wi, this.#hi);
			FontRenderer.drawCenteredString(this.#text, new Vec2((this.#x - FontRenderer.fontHeight - 9) + this.#wi / 2, this.#y + (this.#hi - 8) / 2), new Vec3(224, 224, 224));
		}
	}
	constructor(buttonId = 0, pos = new Vec2(0, 0), widthIn = 200, heightIn = 20, buttonText, callback) {
		if (buttonText == undefined) {
			buttonText = widthIn;
			callback = buttonText;
			widthIn = 200;
			heightIn = 20;
		}
		buttonId = parseInt(buttonId);
		widthIn = parseFloat(widthIn);
		heightIn = parseFloat(heightIn);
		buttonText = buttonText.toString();
		if (isNaN(buttonId)) {
			buttonId = 0;
		}
		if (isNaN(widthIn)) {
			widthIn = 200;
		}
		if (isNaN(heightIn)) {
			heightIn = 20;
		}
		this.#id = buttonId;
		this.#x = pos.x;
		this.#y = pos.y;
		this.#cb = callback;
		this.#wi = widthIn * (FontRenderer.fontHeight / 9);
		this.#hi = heightIn * (FontRenderer.fontHeight / 9);
		this.#text = buttonText;
		document.addEventListener(`mousedown`, e => {
			if (this.#down == false) {
				this.#down = true;
				if (this.#hovered == true) {
					setTimeout(this.#cb);
				}
				return;
			}
			return;
		});
		document.addEventListener(`mouseup`, e => {
			this.#down = false;
			return;
		});
		return;
	}
}