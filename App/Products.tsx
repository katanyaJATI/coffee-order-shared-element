import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {SharedElement} from 'react-navigation-shared-element';

type ProductsProps = NativeStackScreenProps<RootStackParamList, 'Products'>;
function ProductsScreen({navigation}: ProductsProps) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.titleWrapper}>
        <SharedElement id="item.title">
          <Text style={styles.titleText}>Caramet Macchiato</Text>
        </SharedElement>
        <Text style={styles.subTitleText}>
          Naise Coffee can change The atmosphere in the morning
        </Text>
      </View>

      <SharedElement style={{flex: 1}} id="item.photo">
        <Image source={require('./Images/product.png')} style={styles.img} />
      </SharedElement>

      <SharedElement id="item.btn-submit">
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.btnOrder}
          onPress={() => navigation.navigate('ProductDetail')}>
          <Text style={styles.btnOrderText}>ORDER NOW</Text>
        </TouchableOpacity>
      </SharedElement>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E1E0',
  },
  titleWrapper: {
    marginTop: 75,
    marginHorizontal: '25%',
  },
  titleText: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 24,
    color: '#023E4A',
    textAlign: 'center',
  },
  subTitleText: {
    fontFamily: 'Poppins-ExtraBold',
    fontSize: 12,
    color: '#687A79',
    textAlign: 'center',
    marginTop: 10,
  },
  img: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    marginTop: 25,
  },

  btnOrder: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowColor: 'rgba(0, 64, 76, .4)',
    shadowRadius: 10,

    height: 55,
    marginHorizontal: 50,
    borderRadius: 100,
    backgroundColor: '#023E4A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  btnOrderText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});

export default ProductsScreen;
