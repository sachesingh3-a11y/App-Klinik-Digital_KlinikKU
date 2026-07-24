import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function ItemCard({ title, subtitle, extraInfo }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {extraInfo ? <Text style={styles.extra}>{extraInfo}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.card, padding: 16, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  subtitle: { fontSize: 13, color: colors.subtext, marginTop: 2 },
  extra: { fontSize: 12, color: colors.secondary, marginTop: 6, fontWeight: '500' }
});