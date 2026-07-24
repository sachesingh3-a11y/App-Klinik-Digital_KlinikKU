import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function DoctorDetailScreen({ route, navigation }) {
  const { doctor } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.spec}>{doctor.spec}</Text>
        <Text style={styles.exp}>Pengalaman: {doctor.experience}</Text>
        <Text style={styles.price}>Biaya: Rp {doctor.price.toLocaleString('id-ID')}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Booking', { doctor })}
      >
        <Text style={styles.buttonText}>Lanjut Booking Konsultasi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background, justifyContent: 'space-between' },
  card: { backgroundColor: colors.card, padding: 20, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  name: { fontSize: 22, fontWeight: 'bold', color: colors.primary },
  spec: { fontSize: 16, color: colors.secondary, marginVertical: 6 },
  exp: { fontSize: 14, color: colors.subtext, marginBottom: 10 },
  price: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginTop: 10 },
  button: { backgroundColor: colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});