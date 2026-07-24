import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function EmptyState({ message = 'Data tidak ditemukan' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📂</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 40, alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 40, marginBottom: 8 },
  text: { color: colors.subtext, fontSize: 14, textAlign: 'center' }
});