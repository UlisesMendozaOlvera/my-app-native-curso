# Visor de Imágenes React Native

Una aplicación desarrollada con React Native para visualizar imágenes y navegar por directorios de manera eficiente.

## 🌟 Características

- 📁 Navegación por carpetas
- 🖼️ Visualización de imágenes con zoom
- 📱 Interfaz adaptativa y responsive
- ↔️ Deslizamiento horizontal entre imágenes
- 🔄 Indicador de carga
- 📊 Contador de posición (ej: "3/10")
- ⚡ Carga asíncrona de imágenes
- 🎨 Diseño moderno con fondo negro y controles semi-transparentes

## 🛠️ Requisitos Previos

- Node.js (v12 o superior)
- npm o yarn
- React Native CLI
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo Mac)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Configura el servidor:
- Abre `server.js`
- Modifica la constante `DIRECTORY` con la ruta de tus imágenes
- Ajusta el `PORT` si es necesario

4. Configura la URL del servidor en la aplicación:
- Abre `src/screens/GalleryScreen.js` y `src/screens/ImageViewer.js`
- Modifica la constante `API_URL` con la dirección de tu servidor

## 🚀 Ejecución

1. Inicia el servidor:
```bash
node server.js
```

2. Inicia la aplicación React Native:
```bash
# Para Android
npx react-native run-android

# Para iOS
npx react-native run-ios
```

## 📱 Uso

1. Al abrir la aplicación, verás una lista de carpetas disponibles
2. Navega por las carpetas tocando en ellas
3. Las imágenes se muestran en una cuadrícula de 3 columnas
4. Toca una imagen para verla en pantalla completa
5. En el modo de pantalla completa puedes:
   - Deslizar horizontalmente para ver más imágenes
   - Hacer zoom con gestos de pinza
   - Ver tu posición actual (ej: "3/10")
   - Cerrar la vista con el botón en la esquina superior izquierda

## 🔧 Estructura del Proyecto

```
├── src/
│   ├── screens/
│   │   ├── GalleryScreen.js    # Vista principal de carpetas e imágenes
│   │   └── ImageViewer.js      # Visor de imágenes a pantalla completa
│   ├── middleware/
│   │   └── cache.js           # Middleware para caché
│   └── utils/
│       └── fileUtils.js       # Utilidades para manejo de archivos
├── server.js                  # Servidor Express
└── README.md
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## ✨ Créditos

Desarrollado con ❤️ usando:
- React Native
- Express
- react-native-image-pan-zoom 