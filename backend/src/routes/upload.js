import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import minioClient from '../config/minio.js';

const router = express.Router();
const BUCKET = process.env.MINIO_BUCKET;
const PUBLIC_URL = process.env.PUBLIC_URL;

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const folder = req.body.folder || '';
        const isImage = file.mimetype.startsWith('image/');

        let buffer = file.buffer;
        let mimeType = file.mimetype;
        let fileName = file.originalname;

        if (isImage) {
            fileName = file.originalname.replace(/\.[^.]+$/, '.webp');
            buffer = await sharp(file.buffer)
                .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();
            mimeType = 'image/webp';
        }

        const objectName = `${folder}/${Date.now()}-${fileName}`;

        await minioClient.putObject(BUCKET, objectName, buffer, buffer.length, {
            'Content-Type': mimeType,
        });

        res.json({
            publicUrl: `${PUBLIC_URL}/medias/${objectName}`
        });
    } catch (error) {
        console.error('Erreur upload:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const { objectName } = req.body;
        await minioClient.removeObject(BUCKET, objectName);
        res.json({ message: 'Fichier supprimé' });
    } catch (error) {
        console.error('Erreur suppression:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

export default router;
