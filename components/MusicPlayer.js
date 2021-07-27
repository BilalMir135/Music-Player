import React, {useRef, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {songs} from '../model/data';

const {width, height} = Dimensions.get('window');

export const MusicPlayer = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const songSlider = useRef();
  const [songIndex, setSongIndex] = useState(0);

  const skipToNext = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };

  const skipToBack = () => {
    songSlider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

  useEffect(() => {
    scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setSongIndex(index);
    });

    return () => scrollX.removeAllListeners();
  }, []);

  const renderSongs = ({index, item}) => (
    <Animated.View
      style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.artWorkWrapper}>
        <Image source={item.image} style={styles.artWorkImg} />
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Animated.FlatList
          ref={songSlider}
          style={{flexGrow: 0}}
          data={songs}
          renderItem={renderSongs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
        />
        <View>
          <Text style={styles.title}>{songs[songIndex].title}</Text>
          <Text style={styles.artist}>{songs[songIndex].artist}</Text>
        </View>
        <View>
          <Slider
            style={styles.progressContainer}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#ffd369"
            minimumTrackTintColor="#ffd369"
            maximumTrackTintColor="#fff"
            onSlidingComplete={() => {}}
          />
        </View>
        <View style={styles.progressLabelContainer}>
          <Text>0.00</Text>
          <Text>3.00</Text>
        </View>
        <View style={styles.musicControls}>
          <TouchableOpacity onPress={skipToBack}>
            <Ionicons name="play-skip-back-outline" size={35} color="#ffd369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ios-pause-circle" size={75} color="#ffd369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToNext}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color="#ffd369"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomControls}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="repeat" size={30} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// export default MusicPlayer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#222831',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    borderTopColor: '#393E46',
    borderTopWidth: 1,
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  artWorkImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  artWorkWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
    borderRadius: 20,

    //shadow works only in ios
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    //using elevation for android
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#eee',
  },
  artist: {
    fontSize: 16,
    fontWeight: '100',
    textAlign: 'center',
    color: '#eee',
  },
  progressContainer: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
  progressLabelContainer: {
    width: 330,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  musicControls: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center',
  },
});
