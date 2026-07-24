import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../constants/colors';
import { getBookings } from '../services/storage';
import ItemCard from '../components/ItemCard';
import EmptyState from '../components/EmptyState';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    const data = await getBookings();
    setHistory(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Riwayat Konsultasi 📋</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyState message="Belum ada riwayat booking." />}
        renderItem={({ item }) => (
          <ItemCard
            title={item.doctorName}
            subtitle={`${item.doctorSpec}\nNotes: ${item.notes}`}
            extraInfo={`📅 ${item.date}`}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.background },
  header: { fontSize: 20, fontWeight: 'bold', color: colors.primary, marginBottom: 16 }
});