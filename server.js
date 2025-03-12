const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { getFolders, getMediaFiles } = require("./src/utils/fileUtils");
const { cacheInit } = require("./src/middleware/cache");

const app = express();
const PORT = 3000;
const DIRECTORY = "D:/";

app.use(cors());

// Middleware para logging básico
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Middleware para manejar errores de codificación URI
app.use((req, res, next) => {
    try {
        if (req.path) {
            decodeURIComponent(req.path);
        }
        next();
    } catch (e) {
        return res.status(400).json({ error: 'URL mal formada' });
    }
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Error interno del servidor' });
});

app.use(express.static(DIRECTORY));
app.use(express.static(path.join(__dirname, "public")));

app.get("/files", async (req, res) => {
    try {
        const folders = await getFolders(DIRECTORY);
        res.json(folders);
    } catch (error) {
        res.status(500).json({ error: "No se pudo leer el directorio" });
    }
});

app.get("/", cacheInit, async (req, res) => {
    try {
        const folders = await getFolders(DIRECTORY);
        res.json(folders);
    } catch (error) {
        res.status(500).send("Error al leer la carpeta");
    }
});

app.get("/gallery/:folder(*)", async (req, res) => {
    try {
        const folderPath = path.join(DIRECTORY, req.params.folder);

        if (!fs.existsSync(folderPath)) {
            return res.status(404).json({ error: "Carpeta no encontrada" });
        }

        const stats = fs.statSync(folderPath);
        if (!stats.isDirectory()) {
            return res.status(400).json({ error: "La ruta especificada no es un directorio" });
        }

        const { images, videos, pdfs } = await getMediaFiles(folderPath);
        const subfolders = fs
            .readdirSync(folderPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        res.json({ 
            images, 
            videos, 
            pdfs, 
            subfolders,
            currentPath: req.params.folder
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.get("/image/:folder(*)", (req, res) => {
    try {
        const imagePath = path.join(DIRECTORY, req.params.folder);
        
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: "Imagen no encontrada" });
        }

        const mimeType = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        }[path.extname(imagePath).toLowerCase()];

        if (!mimeType) {
            return res.status(400).json({ error: "Archivo no es una imagen válida" });
        }

        res.setHeader('Content-Type', mimeType);
        res.sendFile(imagePath, (err) => {
            if (err && !res.headersSent) {
                res.status(500).json({ error: "Error al cargar la imagen" });
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Sirviendo archivos desde: ${DIRECTORY}`);
}); 