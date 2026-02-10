import { View, Text, Pressable } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f9fafb', gap: 12 }}>
      <Text style={{ fontSize: 34, fontWeight: '700' }}>ProxiFood</Text>
      <Text style={{ color: '#6b7280' }}>Commande < 60 secondes · Tracking live</Text>
      <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 16 }}>
        <Text style={{ fontWeight: '700' }}>Écran Client</Text>
        <Text>RestaurantList · Menu · Checkout · Tracking map</Text>
      </View>
      <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 16 }}>
        <Text style={{ fontWeight: '700' }}>Écran Livreur</Text>
        <Text>Online toggle · Offer pay · Delivery map full screen</Text>
      </View>
      <Pressable style={{ backgroundColor: '#16A34A', borderRadius: 16, padding: 16 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Go Online</Text>
      </Pressable>
    </View>
  );
}
