import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import colors from '../constants/colors';
import { saveBooking } from '../services/storage';

export default function BookingScreen({ route, navigation }) {
  const { doctor } = route.params;
  const [tanggal, setTanggal] = useState('');
  const [keluhan, setKeluhan] = useState('');

  const handleBooking = async () => {
    if (!tanggal || !keluhan) {
      Alert.alert('Gagal', 'Mohon lengkapi tanggal dan keluhan!');
      return;
    }

    const newBooking = {
      id: Date.now().toString(),
      doctorName: doctor.name,
      doctorSpec: doctor.spec,
      date: tanggal,
      notes: keluhan,
    };

    await saveBooking(newBooking);
    Alert.alert('Berhasil', 'Jadwal konsultasi berhasil disimpan!', [
      { text: 'OK', onPress: () => navigation.navigate('MainTab', { screen: 'HistoryTab' }) }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Konsultasi</Text>
      <Text style={styles.docName}>{doctor.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Tanggal (misal: 25 Juli 2026)"
        value={tanggal}
        onChangeText={setTanggal}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Keluhan Singkat Pasien"
        multiline
        value={keluhan}
        onChangeText={setKeluhan}
      />

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Konfirmasi Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  header: { fontSize: 18, color: colors.subtext },
  docName: { fontSize: 20, fontWeight: 'bold', color: colors.primary, marginBottom: 20 },
  input: { backgroundColor: colors.card, padding: 12, borderRadius: 8, marginBottom: 14, borderWidth: 1, borderColor: colors.border },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold' }
});