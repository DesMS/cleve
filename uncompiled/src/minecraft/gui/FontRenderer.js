class FontRenderer {
	static drawString(text = ``, size = 10, pos = new Vec2(0, 0), color = new Vec3(255, 255, 255)) {
		if (!(pos instanceof Vec2)) {
			// console.warn(`Pos is not of Vec2, setting to default`);
			pos = new Vec2(0, 0);
		}
		if (!(color instanceof Vec3)) {
			console.warn(`Color is not of Vec3, setting to default`);
			color = new Vec3(255, 255, 255);
		}
		if (typeof size != `number`) {
			console.warn(`Size is not of number, setting to default`);
			size = 10;
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
		Minecraft.gl2D.font = `${size}px 'mc'`;
		Minecraft.gl2D.fillText(`${text}`, pos.x + parseInt(size / 4), pos.y + size);
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