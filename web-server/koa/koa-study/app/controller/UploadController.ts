import { Context } from 'koa';
import { File } from 'formidable';
import { createReadStream, createWriteStream } from 'fs';
import response from '../../utils/response';
import path from 'path';

class UploadController {
	async upload(ctx: Context) {
		if (!ctx.request.files) {
			return response.error(ctx, '文件不能为空');
		}
		const files: Record<string, File> = ctx.request.files as {};
		const keys = Object.keys(files);
		const retFileList = [];
		for (let i = 0; i < keys.length; i++) {
			const key: string = keys[i];
			const file = files[key];
			const type = file.mimetype;
			const ext = path.extname(file.originalFilename as string);
			const newFilename = file.newFilename;
			const newFullFilename = newFilename + ext;
			const originalFilename = file.originalFilename;
			const rs = createReadStream(file.filepath);
			const ws = createWriteStream(path.join(__dirname, '../../static/', newFilename + ext));
			rs.pipe(ws);
			retFileList.push({ newFullFilename, newFilename, type, ext, originalFilename });
		}
		response.success(ctx, retFileList);
	}
}

export default new UploadController();
