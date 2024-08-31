import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions  } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

// Define una interfaz para el tipo de datos que esperas
interface Exchange {
  exchange_id: string;
  name: string;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
}

const numColumns = 2; 
const { width } = Dimensions.get('window'); 


const App = () => {
  const [data, setData] = useState<Exchange[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://rest.coinapi.io/v1/exchanges', {
          headers: { 'X-CoinAPI-Key': '0592a3f6-9afb-47ce-8ea1-65fe3a0e5263' }
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const result: Exchange[] = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Exchange }) => (
    <LinearGradient
      colors={['#1e3c72', '#2a5298']} // Degradado de azul marino a un tono más claro
      style={styles.card}
    >
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.divider}></View>
      <View style={styles.row}>
        <Text style={styles.label}>Volumen 1 Hora:</Text>
        <Text style={styles.value}>${item.volume_1hrs_usd.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Volumen 1 Día:</Text>
        <Text style={styles.value}>${item.volume_1day_usd.toFixed(2)}</Text>
      </View>
    </LinearGradient>
  );

  return (
    <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.exchange_id}
    numColumns={numColumns} 
    contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2', 
  },
  card: {
    padding: 20,
    margin: 8, 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8, // Para Android, añade sombra
    width: (width / numColumns) - 24, // Ajusta el ancho para que quepan dos cards
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff', // Color de texto blanco para contraste
  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#e0e0e0', // Texto gris claro para las etiquetas
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff', // Texto blanco para los valores
  },
});

export default App;