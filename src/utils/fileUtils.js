const fs = require('fs').promises;
const path = require('path');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const videoExtensions = ['.mp4', '.webm', '.ogg'];
const pdfExtension = '.pdf';

async function getFolders(directory) {
    try {
        console.log('Leyendo directorio:', directory);
        const items = await fs.readdir(directory, { withFileTypes: true });
        const folders = items
            .filter(item => item.isDirectory())
            .map(item => item.name);
        console.log(`Se encontraron ${folders.length} carpetas en ${directory}`);
        return folders;
    } catch (error) {
        console.error(`Error al leer el directorio ${directory}:`, error);
        throw new Error(`No se pudo leer el directorio: ${error.message}`);
    }
}

async function getMediaFiles(directory) {
    try {
        console.log('Buscando archivos multimedia en:', directory);
        const items = await fs.readdir(directory, { withFileTypes: true });
        const files = items.filter(item => item.isFile()).map(item => item.name);

        const result = {
            images: files.filter(file => 
                imageExtensions.includes(path.extname(file).toLowerCase())
            ),
            videos: files.filter(file => 
                videoExtensions.includes(path.extname(file).toLowerCase())
            ),
            pdfs: files.filter(file => 
                path.extname(file).toLowerCase() === pdfExtension
            )
        };

        console.log('Archivos encontrados:', {
            numImages: result.images.length,
            numVideos: result.videos.length,
            numPdfs: result.pdfs.length
        });

        return result;
    } catch (error) {
        console.error(`Error al leer los archivos multimedia en ${directory}:`, error);
        throw new Error(`No se pudieron leer los archivos multimedia: ${error.message}`);
    }
}

module.exports = {
    getFolders,
    getMediaFiles
}; 