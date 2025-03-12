import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://192.168.1.69:3000';
const { width, height } = Dimensions.get('window');

const ImageViewer = ({ route, navigation }) => {
  const { images, folder, currentIndex } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
  };

  const renderImage = ({ item: imageName }) => {
    return (
      <View style={styles.imageContainer}>
        <ImageZoom
          cropWidth={width}
          cropHeight={height}
          imageWidth={width}
          imageHeight={height}
          enableSwipeDown={false}
          minScale={1}
          maxScale={3}
        >
          <Image
            source={{ uri: `${API_URL}/image/${encodeURIComponent(`${folder}/${imageName}`)}` }}
            style={styles.image}
            resizeMode="contain"
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
          />
        </ImageZoom>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </View>
    );
  };

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const newIndex = Math.floor(contentOffset.x / viewSize.width);
    
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
      navigation.setOptions({ title: images[newIndex] });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.imageCount}>
          {currentImageIndex + 1} / {images.length}
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImage}
        keyExtractor={(item) => item}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={currentIndex}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScroll={handleScroll}
        onScrollToIndexFailed={() => {}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    padding: 5,
  },
  imageCount: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  image: {
    width: width,
    height: height,
  },
});

export default ImageViewer; 