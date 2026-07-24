import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_SESSION: '@klinikku_user',
  BOOKINGS: '@klinikku_bookings',
};

// SIMPAN USER SESSION
export const saveUserSession = async (user) => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(KEYS.USER_SESSION, jsonValue);
  } catch (e) {
    console.error('Error saving user session:', e);
  }
};

// AMBIL USER SESSION
export const getUserSession = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.USER_SESSION);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading user session:', e);
    return null;
  }
};

// HAPUS USER SESSION (LOGOUT)
export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.USER_SESSION);
  } catch (e) {
    console.error('Error clearing session:', e);
  }
};

// SIMPAN DATA BOOKING KONSULTASI
export const saveBooking = async (newBooking) => {
  try {
    const existingBookings = await getBookings();
    const updatedBookings = [newBooking, ...existingBookings];
    await AsyncStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updatedBookings));
    return updatedBookings;
  } catch (e) {
    console.error('Error saving booking:', e);
  }
};

// AMBIL DATA BOOKING KONSULTASI
export const getBookings = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.BOOKINGS);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error getting bookings:', e);
    return [];
  }
};