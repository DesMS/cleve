class FontRenderer {
	/*
	static getStringWidth(text = ``) {
		if (text == null || text == undefined) {
			return 0;
		} else {
			var g = 0;
			text = text.toString();
			var flag = false;
			for (var i = 0; i < text.length; i += 1) {
				var c0 = text.charAt(i);
				var k = this.getCharWidth(c0);
				if (k < 0 && i < text.length() - 1) {
					i += 1;
					c0 = text.charAt(i);
					if (c0 != `l` && c0 != `L`) {
						if (c0 == `r` || c0 == `R`) {
							flag = false;
						}
					} else {
						flag = true;
					}
					k = 0;
				}

				g += k;

				if (flag && k > 0) {
					g += 1;
				}
			}
			return g;
		}
	}
	*/
	static fontHeight = 9;
	static drawCenteredString(text = ``, pos = new Vec2(0, 0), color = new Vec3(255, 255, 255)) {
		text = text.toString();
		Minecraft.gl2D.font = `${this.fontHeight}px 'mc'`;
		this.drawStringWithShadow(text, new Vec2((pos.x - Minecraft.gl2D.measureText(text).width / 2), pos.y), color);
	}
	static drawStringWithShadow(text = ``, pos = new Vec2(0, 0), color = new Vec3(255, 255, 255)) {
		if (!(pos instanceof Vec2)) {
			// console.warn(`Pos is not of Vec2, setting to default`);
			pos = new Vec2(0, 0);
		}
		if (!(color instanceof Vec3)) {
			console.warn(`Color is not of Vec3, setting to default`);
			color = new Vec3(255, 255, 255);
		}
		if (color.x < 0) {
			color.x = 0;
		}
		if (color.x > 255) {
			color.x = 255;
		}
		if (color.y < 0) {
			color.y = 0;
		}
		if (color.y > 255) {
			color.y = 255;
		}
		if (color.z < 0) {
			color.z = 0;
		}
		if (color.z > 255) {
			color.z = 255;
		}
		Minecraft.gl2D.fillStyle = `rgb(${(color.x / 4).toString()}, ${(color.y / 4).toString()}, ${(color.z / 4).toString()})`;
		Minecraft.gl2D.font = `${this.fontHeight}px 'mc'`;
		Minecraft.gl2D.fillText(`${text}`, (pos.x + parseInt(this.fontHeight / 4)) + 2.0, (pos.y + this.fontHeight) - 7.0);
		Minecraft.gl2D.fillStyle = `rgb(${color.x.toString()}, ${color.y.toString()}, ${color.z.toString()})`;
		Minecraft.gl2D.font = `${this.fontHeight}px 'mc'`;
		Minecraft.gl2D.fillText(`${text}`, pos.x + parseInt(this.fontHeight / 4), pos.y + this.fontHeight - 9.0);
	}
	static drawString(text = ``, pos = new Vec2(0, 0), color = new Vec3(255, 255, 255)) {
		if (!(pos instanceof Vec2)) {
			// console.warn(`Pos is not of Vec2, setting to default`);
			pos = new Vec2(0, 0);
		}
		if (!(color instanceof Vec3)) {
			console.warn(`Color is not of Vec3, setting to default`);
			color = new Vec3(255, 255, 255);
		}
		if (color.x < 0) {
			color.x = 0;
		}
		if (color.x > 255) {
			color.x = 255;
		}
		if (color.y < 0) {
			color.y = 0;
		}
		if (color.y > 255) {
			color.y = 255;
		}
		if (color.z < 0) {
			color.z = 0;
		}
		if (color.z > 255) {
			color.z = 255;
		}
		Minecraft.gl2D.fillStyle = `rgb(${color.x.toString()}, ${color.y.toString()}, ${color.z.toString()})`;
		Minecraft.gl2D.font = `${this.fontHeight}px 'mc'`;
		Minecraft.gl2D.fillText(`${text}`, pos.x + parseInt(this.fontHeight / 4), pos.y + this.fontHeight - 9);
		/*
		if (this.#maxWidth == undefined) {
			// ^^^
		} else {
			Minecraft.gl2D.fillText(`${text}`, this.#x + parseInt(this.#size / 4), this.#y + this.#size, this.#maxWidth);
		}
		*/
		return;
	}
}