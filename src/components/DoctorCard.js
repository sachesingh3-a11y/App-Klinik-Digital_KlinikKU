import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function DoctorCard({ doctor, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.info}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.spec}>{doctor.spec}</Text>
        <Text style={styles.price}>Rp {doctor.price.toLocaleString('id-ID')}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Detail ➔</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: colors.border, elevation: 1 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  spec: { fontSize: 13, color: colors.subtext, marginVertical: 4 },
  price: { fontSize: 14, fontWeight: '700', color: colors.primary },
  badge: { backgroundColor: colors.background, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  badgeText: { fontSize: 12, color: colors.secondary, fontWeight: '600' }
});