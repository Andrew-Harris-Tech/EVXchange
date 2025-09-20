import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Booking Detail</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
