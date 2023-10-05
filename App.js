import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_rfcCIPVpdQ7YZ8TLlNUrDckneefKvLmfn4BpYBacIHtGZF1g6zwUAyrkotqK1paP'
      );
      setData(response.data);
      setCurrentIndex(0);
    } catch (error) {
      console.error(error);
    }
  };

  const changeImage = () => {
    if (data.length > 0) {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'gray' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 8, padding: 16, shadowColor: 'black', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, backgroundColor: 'gray' }}>
        <Image
          source={{ uri: data[currentIndex]?.url }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
        />
        <Text style={{ marginTop: 8, width: 120, textAlign: 'center' }}>{data[currentIndex]?.breeds[0].temperament}</Text>
        <Button
          title="Cambiar Imagen"
          onPress={changeImage}
          color="#4B0082"
          style={{ borderRadius: 10, overflow: 'hidden' }}
        />
      </View>
    </View>
  );
}

export default App;
