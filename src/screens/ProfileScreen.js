import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '../constants/colors';
import { getUserSession, clearSession } from '../services/storage';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    getUserSession().then(setUser);
  }, []);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin Ditolak', 'Dibutuhkan izin galeri/kamera untuk upload foto KTP.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    await clearSession();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil Pasien 👤</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Nama: {user?.nama || '-'}</Text>
        <Text style={styles.text}>Email: {user?.email || '-'}</Text>
      </View>

      <Text style={styles.subHeader}>Foto Identitas (KTP)</Text>
      <View style={styles.imageBox}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>Belum ada foto KTP</Text>
        )}
      </View>

      <TouchableOpacity style={styles.uploadBtn} onPress={handlePickImage}>
        <Text style={styles.btnText}>📷 Upload Foto KTP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.btnText}>Keluar / Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  header: { fontSize: 20, fontWeight: 'bold', color: colors.primary, marginBottom: 16 },
  subHeader: { fontSize: 14, fontWeight: 'bold', color: colors.subtext, marginBottom: 8 },
  card: { backgroundColor: colors.card, padding: 16, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  text: { fontSize: 16, color: colors.text, marginBottom: 4 },
  imageBox: { height: 180, backgroundColor: '#E2E8F0', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 12, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  placeholder: { color: colors.subtext },
  uploadBtn: { backgroundColor: colors.secondary, padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  logoutBtn: { backgroundColor: colors.danger, padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' }
});