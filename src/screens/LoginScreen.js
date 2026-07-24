import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { saveUserSession } from '../services/storage';

export default function LoginScreen({ navigation }) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!nama.trim() || !email.trim()) {
      setError('Mohon isi semua bidang!');
      return;
    }
    if (!email.includes('@')) {
      setError('Format email tidak valid!');
      return;
    }

    await saveUserSession({ nama, email });
    navigation.replace('MainTab');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Klinikku 🏥</Text>
      <Text style={styles.subtitle}>Portal Layanan Pasien Digital</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap Pasien"
        value={nama}
        onChangeText={(txt) => { setNama(txt); setError(''); }}
      />
      <TextInput
        style={styles.input}
        placeholder="Alamat Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(txt) => { setEmail(txt); setError(''); }}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk Ke Aplikasi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.primary, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.subtext, textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: colors.card, padding: 14, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  errorText: { color: colors.danger, marginBottom: 12, textAlign: 'center' }
});