import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';

const screenX = Dimensions.get('window').width;
const screenY = Dimensions.get('window').height;
const isIphoneX = screenY / screenX > 2.1;

type ProductDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;
function ProductDetailScreen({navigation}: ProductDetailProps) {
  const [size, setSize] = useState<'S' | 'M' | 'L'>('S');
  const mountSize = useRef(new Animated.Value(0)).current;
  const mountCombo = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animStart(mountSize, 600);
    animStart(mountCombo, 750);
  }, [mountCombo, mountSize]);

  const animStart = (state: any, delay: any) => {
    Animated.timing(state, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
      delay,
    }).start();
  };

  const animSize = {
    opacity: mountSize,
    transform: [
      {
        translateY: mountSize.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
    ],
  };
  const animCombo = {
    opacity: mountSize,
    transform: [
      {
        translateY: mountCombo.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const sizes: ('S' | 'M' | 'L')[] = ['S', 'M', 'L'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerWrapper}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.btnHeader}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('./Images/icon-back.png')}
            style={styles.imgHeader}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <SharedElement id="item.photo">
          <Image
            source={require('./Images/product.png')}
            style={styles.imgItem}
          />
        </SharedElement>
        <SharedElement id="item.title">
          <Text style={styles.titleText}>Caramel Macchiato</Text>
        </SharedElement>
        <Text style={styles.descText}>
          We cannot guarantee that any unpackaged products served in our stores
          are allergen-free
        </Text>

        <Animated.View style={[styles.boxSection, animSize]}>
          <Text style={styles.boxText}>SIZE</Text>
          <View style={styles.sizeWrapper}>
            {sizes.map((item, index) => (
              <TouchableOpacity
                key={index + ''}
                activeOpacity={0.6}
                style={size === item ? styles.btnSizeActive : styles.btnSize}
                onPress={() => setSize(item)}>
                <Text
                  style={
                    size === item
                      ? styles.btnSizeActiveText
                      : styles.btnSizeText
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.boxSection, animCombo]}>
          <Text style={styles.boxText}>COMBO</Text>
          <View style={styles.comboWrapper}>
            <View style={styles.comboLeft}>
              <Image
                source={require('./Images/food.png')}
                style={styles.imgFood}
              />
            </View>
            <View style={styles.comboCenter}>
              <Text style={styles.comboNameText}>CROISSANT</Text>
              <View style={styles.comboRating}>
                {new Array(5).fill(null).map((item, idx) => (
                  <Image
                    key={idx + ''}
                    source={require('./Images/icon-star.png')}
                    style={idx < 4 ? styles.imgStarActive : styles.imgStar}
                  />
                ))}
              </View>
            </View>
            <View style={styles.comboRight}>
              <TouchableOpacity activeOpacity={0.6} style={styles.btnAddCombo}>
                <Image
                  source={require('./Images/icon-add.png')}
                  style={styles.imgAddCombo}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <View style={styles.actionWrapper}>
          <TouchableOpacity activeOpacity={0.6} style={styles.btnCart}>
            <Image
              source={require('./Images/icon-cart.png')}
              style={styles.imgCart}
            />
            <View style={styles.circleCart}>
              <Image
                source={require('./Images/icon-cart-number.png')}
                style={styles.imgCartNumber}
              />
              <Text style={styles.imgCartNumberText}>3</Text>
            </View>
          </TouchableOpacity>

          <SharedElement style={{flex: 0.89}} id="item.btn-submit">
            <TouchableOpacity activeOpacity={0.6} style={styles.btnAddToBag}>
              <Text style={styles.addToBagText}>ADD TO BAG</Text>
              <View style={styles.addToBagDivider} />
              <Text style={styles.dollarText}>$5.99</Text>
            </TouchableOpacity>
          </SharedElement>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D1E1E0',
  },

  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    height: 50,
  },

  btnOrderText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  btnHeader: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeader: {
    width: 21,
    height: 50,
    resizeMode: 'contain',
  },
  imgItem: {
    alignSelf: 'center',
    width: screenX / 1.8,
    height: ((screenX / 1.8) * 243) / 192,
    resizeMode: 'contain',
  },
  titleText: {
    marginTop: -20,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#023E4A',
    textAlign: 'center',
  },
  descText: {
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#023E4A',
    textAlign: 'center',
    marginHorizontal: 40,
  },

  boxSection: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  boxText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#000',
  },
  sizeWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btnSize: {
    flex: 0.28,
    height: isIphoneX ? 67.5 : 60,
    borderWidth: 1,
    borderColor: '#023E4A',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSizeActive: {
    flex: 0.28,
    height: isIphoneX ? 67.5 : 60,
    borderWidth: 1,
    backgroundColor: '#023E4A',
    borderColor: '#023E4A',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSizeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    color: '#023E4A',
  },
  btnSizeActiveText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 24,
    color: '#fff',
  },

  comboWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    height: isIphoneX ? 92.5 : 80,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 25,

    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'rgba(0, 64, 76, .2)',
    shadowRadius: 10,
  },
  comboLeft: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgFood: {
    height: (isIphoneX ? 67.5 : 60) - 7.5,
    width: (isIphoneX ? 67.5 : 60) - 7.5,
    resizeMode: 'contain',
    marginLeft: 5,
  },

  comboCenter: {
    flex: 0.49,
    justifyContent: 'center',
  },
  comboNameText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#000',
  },
  comboRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgStar: {
    width: 10,
    height: 10,
    marginRight: 5,
    resizeMode: 'contain',
    tintColor: '#DCDCDC',
  },
  imgStarActive: {
    width: 10,
    height: 10,
    marginRight: 5,
    resizeMode: 'contain',
    tintColor: '#FDB812',
  },

  comboRight: {
    flex: 0.21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnAddCombo: {
    padding: 5,
  },
  imgAddCombo: {
    width: isIphoneX ? 30 : 24,
    height: isIphoneX ? 30 : 24,
    resizeMode: 'contain',
  },

  actionWrapper: {
    height: isIphoneX ? 62.5 : 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: 7.5,
  },
  btnCart: {
    width: isIphoneX ? 62.5 : 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#023E4A',
  },
  imgCart: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    margin: '30%',
  },
  circleCart: {
    position: 'absolute',
    top: -(isIphoneX ? 35 : 30) / 2,
    right: -(isIphoneX ? 35 : 30) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: isIphoneX ? 35 : 30,
    height: isIphoneX ? 37.5 : 30,
  },
  imgCartNumber: {
    position: 'absolute',
    width: isIphoneX ? 35 : 30,
    height: isIphoneX ? 37.5 : 30,
    resizeMode: 'contain',
  },
  imgCartNumberText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000',
  },

  btnAddToBag: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#023E4A',
  },
  addToBagText: {
    flex: 0.6,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  addToBagDivider: {
    width: 1,
    backgroundColor: '#BFBFBF',
    marginVertical: 13.5,
  },
  dollarText: {
    flex: 0.4,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});

ProductDetailScreen.sharedElements = () => {
  return ['item.photo', 'item.btn-submit', 'item.title'];
};

export default ProductDetailScreen;
