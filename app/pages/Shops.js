import React, { useEffect, useState } from 'react';

import {
  Text, StyleSheet, Dimensions, View, ScrollView,
} from 'react-native';
import Background from '../components/Background';
import ShopUnit from '../components/units/ShopUnit';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    display: "flex",
    marginTop: Dimensions.get('window').height * 0.12,
    marginBottom: Dimensions.get('window').height * 0.06,
    width: '100%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 5
  },
  titlecontainer: {
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const Shops = ({navigation}) => {

  useEffect(() => {
    console.log("Shops page")
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.titlecontainer}>
          <Text style={styles.title}>Shops</Text>
        </View>
        <ScrollView contentContainerStyle={{width: "100%"}}>
          <ShopUnit
            name="Continente"
            address="R. dos Campeões Europeus 28-198, 4350-149 Porto"
            photo="https://www.dinheirovivo.pt/wp-content/uploads/2018/07/hipermercadocontinente_dv.jpg"
            navigation={navigation}
          />
          <ShopUnit
            name="Farmácia Central"
            address="Av. Dr. Ribeiro de Magalhães 658, 4610-108 Felgueiras"
            photo="https://www.cm-mourao.pt/pt/site-servicos/PublishingImages/Farmacia%20Central.jpg?RenditionID=16&Width=639&Height=362"
            navigation={navigation}
          />
          <ShopUnit
            name="Norteshopping"
            address="R. Sara Afonso, 4460-841 Sra. da Hora"
            photo="https://nit.pt/wp-content/uploads/2019/06/fc6945645b5ec9a7a2f3abadac824498.jpg"
            navigation={navigation}
          />
        </ScrollView>
      </View>
    </Background>
  )
};

export default Shops;
