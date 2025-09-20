import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function StationDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Station Detail</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
