import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://192.168.1.69:3000';
const { width } = Dimensions.get('window');
const imageSize = width / 3 - 4;

const GalleryScreen = ({ route, navigation }) => {
  const { folder } = route.params;
  const [mediaFiles, setMediaFiles] = useState({
    images: [],
    videos: [],
    pdfs: [],
    subfolders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGalleryContent();
  }, [folder]);

  const fetchGalleryContent = async () => {
    try {
      const url = `${API_URL}/gallery/${encodeURIComponent(folder)}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      setMediaFiles(data);
      setLoading(false);
    } catch (err) {
      setError(`Error al cargar el contenido de la galería: ${err.message}`);
      setLoading(false);
    }
  };

  const handleImagePress = (item) => {
    const imageIndex = mediaFiles.images.findIndex(img => img === item);
    navigation.navigate('ImageViewer', { 
      imagePath: `${folder}/${item}`,
      title: item,
      currentIndex: imageIndex,
      images: mediaFiles.images,
      folder: folder
    });
  };

  const renderItem = ({ item, type }) => {
    if (type === 'folder') {
      return (
        <TouchableOpacity
          style={styles.folderItem}
          onPress={() => navigation.push('Gallery', { folder: `${folder}/${item}` })}
        >
          <Ionicons name="folder" size={24} color="#4A90E2" />
          <Text style={styles.folderText}>{item}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleImagePress(item)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: `${API_URL}/image/${encodeURIComponent(`${folder}/${item}`)}` }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageTitleContainer}>
          <Text style={styles.imageTitle} numberOfLines={1}>
            {item}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const allItems = [
    ...mediaFiles.subfolders.map(item => ({ item, type: 'folder' })),
    ...mediaFiles.images.map(item => ({ item, type: 'image' })),
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={allItems}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => `${item.type}-${item.item}`}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  listContent: {
    padding: 2,
  },
  imageContainer: {
    margin: 1,
    width: imageSize,
    height: imageSize,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 4,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    backgroundColor: '#f8f8f8',
    marginVertical: 1,
    borderRadius: 8,
  },
  folderText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default GalleryScreen; 