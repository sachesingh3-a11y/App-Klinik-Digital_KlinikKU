import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import DoctorCard from '../components/DoctorCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const DUMMY_DOCTORS = [
  { id: '1', name: 'dr. Andi Pratama, Sp.PD', spec: 'Spesialis Penyakit Dalam', price: 150000, experience: '8 Tahun' },
  { id: '2', name: 'dr. Sarah Wijaya, Sp.A', spec: 'Spesialis Anak', price: 125000, experience: '5 Tahun' },
  { id: '3', name: 'dr. Budi Santoso, Sp.OG', spec: 'Spesialis Kandungan', price: 200000, experience: '12 Tahun' },
  { id: '4', name: 'dr. Maya Indah, Sp.KK', spec: 'Spesialis Kulit & Kelamin', price: 175000, experience: '6 Tahun' },
];

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoctors(DUMMY_DOCTORS);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner message="Memuat daftar dokter..." />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Dokter Praktek 👨‍⚕️</Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyState message="Tidak ada data dokter." />}
        renderItem={({ item }) => (
          <DoctorCard
            doctor={item}
            onPress={() => navigation.navigate('DoctorDetail', { doctor: item })}
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