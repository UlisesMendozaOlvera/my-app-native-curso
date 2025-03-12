import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://192.168.1.69:3000'; // Usando la IP local

const FoldersScreen = ({ navigation }) => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      const response = await fetch(`${API_URL}/files`);
      const data = await response.json();
      setFolders(data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar las carpetas');
      setLoading(false);
    }
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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.folderItem}
      onPress={() => navigation.navigate('Gallery', { folder: item })}
    >
      <Ionicons name="folder" size={24} color="#4A90E2" />
      <Text style={styles.folderText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={folders}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  folderText: {
    marginLeft: 10,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default FoldersScreen; 