class MainOptionsMenu {
	static #back;
	static init() {
		const temp0 = document.createElement(`canvas`);
		temp0.width = `64`;
		temp0.height = `64`;
		const temp1 = temp0.getContext(`2d`);
		temp1.imageSmoothingEnabled = false;
		temp1.drawImage(Texture.optbg, 0, 0, 16, 16, 0, 0, 64, 64);
		const temp2 = document.createElement(`canvas`);
		temp2.width = `64`;
		temp2.height = `64`;
		const temp3 = temp2.getContext(`2d`);
		temp3.imageSmoothingEnabled = false;
		temp3.globalCompositeOperation = `source-over`;
		temp3.drawImage(temp0, 0, 0);
		temp3.globalCompositeOperation = `multiply`;
		temp3.fillStyle = `rgba(0, 0, 0, ${(255 - 64) / 255})`;
		temp3.fillRect(0, 0, 64, 64);
		temp3.globalCompositeOperation = `destination-in`;
		temp3.drawImage(temp0, 0, 0);
		temp3.globalCompositeOperation = `source-over`;
		this.#back = Minecraft.gl2D.createPattern(temp2, `repeat`)
		return;
	}
	static frame() {
		Minecraft.gl2D.fillStyle = this.#back;
		Minecraft.gl2D.fillRect(0, 0, Minecraft.width, Minecraft.height);
		return;
	}
}