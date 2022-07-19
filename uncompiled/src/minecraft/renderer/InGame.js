class InGame {
	static #lastinfo = [
		new Vec3(0, 0, 0),
		0,
		0,
		[]
	];
	static frame() {
		Minecraft.camera.calculate();
		if ([
			Minecraft.camera.pos,
			Minecraft.camera.cx,
			Minecraft.camera.cy,
			Chunk.blocks
		] != this.#lastinfo) {
			GL.addChunks();
			this.#lastinfo = [
				Minecraft.camera.pos,
				Minecraft.camera.cx,
				Minecraft.camera.cy,
				Chunk.blocks
			];
		} else {
			GL.reuse();
		}
		FontRenderer.drawString(`FPS: ${Minecraft.fps}`, new Vec2(0, 0), new Vec3(255, 255, 255));
	}
}