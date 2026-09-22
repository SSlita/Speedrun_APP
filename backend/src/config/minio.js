import * as Minio from 'minio';
import dotenv from 'dotenv';
dotenv.config();

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const BUCKET = process.env.MINIO_BUCKET;

export async function deleteFolder(prefix) {
    return new Promise((resolve, reject) => {
        const objectsList = [];
        const stream = minioClient.listObjectsV2(BUCKET, prefix, true);
        stream.on('data', (obj) => objectsList.push(obj.name));
        stream.on('error', reject);
        stream.on('end', async () => {
            if (objectsList.length === 0) return resolve();
            try {
                await minioClient.removeObjects(BUCKET, objectsList);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
}

export async function renameFolder(oldPrefix, newPrefix) {
    return new Promise((resolve, reject) => {
        const objectsList = [];
        const stream = minioClient.listObjectsV2(BUCKET, oldPrefix, true);
        stream.on('data', (obj) => objectsList.push(obj.name));
        stream.on('error', reject);
        stream.on('end', async () => {
            try {
                for (const oldName of objectsList) {
                    const newName = newPrefix + oldName.slice(oldPrefix.length);
                    await minioClient.copyObject(BUCKET, newName, `/${BUCKET}/${oldName}`);
                }
                if (objectsList.length > 0) {
                    await minioClient.removeObjects(BUCKET, objectsList);
                }
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    });
}

export function extractObjectName(publicUrl) {
    const idx = publicUrl.indexOf('/medias/');
    if (idx === -1) return null;
    return decodeURIComponent(publicUrl.slice(idx + '/medias/'.length));
}

export async function deleteFile(objectName) {
    try {
        await minioClient.removeObject(BUCKET, objectName);
    } catch (error) {
        console.log("Erreur suppression fichier:", error.message);
    }
}

export default minioClient;
