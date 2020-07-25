import React, { useState, useRef } from 'react';
import 
{ 
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Dimensions, 
  ImageBackground, 
  TextInput, 
  TouchableOpacity, 
  Image,
  
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import filmes from './src/service'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function App() {
  const carouselRef = useRef(null);
  const [lista, setLista] = useState(filmes);
  const [background, setBackground] = useState(lista[0].img);
  const [activeIndex, setActiveIndex] = useState(0);

  const _renderItem = ({ item, index }) => {
    return(
      <View>
        <TouchableOpacity>
          <Image
            source={{uri: item.img}}
            style={styles.carouselImg}
            />
            <Text style={styles.carouselText}>{item.title}</Text>
            <Icon 
            name="play-circle-outline" 
            size={30} color="#FFF" 
            style={styles.carouselIcon} 
          />
        </TouchableOpacity>
      </View>
    );
  };

 return (
   <ScrollView style={styles.container}>
     <View style={{flex:1, height: screenHeight}}>
        <View style={{...StyleSheet.absoluteFill, backgroundColor: '#000'}}>  
          <ImageBackground
          source={{ uri: background}}
          style={styles.imgBg}
          blurRadius={8}
          >

            <View style={styles.viewSearch}>
              <TextInput
                style={styles.input}
                placeholder="Procurando algo?"
              />
              <TouchableOpacity style={styles.icon}>
                <Icon name="search" color="#000" size={25} />
              </TouchableOpacity>
            </View>

            <Text 
            style={{color: '#FFF', fontSize: 25, fontWeight: 'bold', 
            marginLeft: 10, marginVertical: 10, }}
            >
              Acabou de chegar
            </Text>

            <View style={styles.slideView}>
              <Carousel
                style={styles.carousel}
                ref={carouselRef}
                data={lista}
                renderItem={_renderItem}
                sliderWidth={screenWidth}
                itemWidth={200}
                inactiveSlideOpacity={0.5}
                onSnapToItem={ (index) => {
                  setBackground(lista[index].img);
                  setActiveIndex(index);
              }}
              />
            </View>

            <View style={styles.moreInfo}>
              <View style={{marginTop: 10}}>
                <Text style={styles.movieTitle}>{lista[activeIndex].title}</Text>
                <Text style={styles.movieDesc}>{lista[activeIndex].text}</Text>
              </View>
              <TouchableOpacity 
                style={{ marginRight: 15, marginTop: 10 }} 
                onPress={() => alert('CLICOU')}
              >
                <Icon 
                name="queue" 
                color="#131313" 
                size={30} 
                />
              </TouchableOpacity>
            </View>

          </ImageBackground>
        </View>
     </View>
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  imgBg:{
    flex:1,
    width: null,
    height: null,
    opacity: 1,
    justifyContent: "flex-start",
    backgroundColor: '#000'
  },
  viewSearch:{
    marginTop: 20,
    backgroundColor: '#FFF',
    elevation: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  input:{
    width: '90%',
    padding: 13,
    paddingLeft: 20,
    fontSize: 17,
  },
  icon:{
    position: 'absolute',
    right: 20,
    top: 15,
  },
  slideView:{
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carousel:{
    flex:1,
    overflow: 'visible'
  },
  carouselImg:{
    alignSelf: 'center',
    width: 200,
    height: 300,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  carouselText:{
    padding: 15,
    color: '#FFF',
    position: 'absolute',
    bottom: 10,
    left: 2,
    fontWeight: 'bold'
  },
  carouselIcon:{
    position:'absolute',
    top: 15,
    right: 15,
  },
  moreInfo:{
    backgroundColor: '#FFF',
    width: screenWidth,
    height: screenHeight,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  movieTitle:{
    paddingLeft: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#131313',
    marginBottom: 5,
  },
  movieDesc:{
    paddingLeft: 15,
    color: '#131313',
    fontSize: 14,
    fontWeight: 'bold'
  }
});