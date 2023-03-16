import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, useAnimatedValue, View } from 'react-native';
import  Animated, { 
  Easing,
  useAnimatedStyle, 
  useSharedValue,
  withTiming
 }  from 'react-native-reanimated';

 // 47:10 - time code on video

const FPS = 60;
const DELTA = 1000 / FPS;
const SPEED = 0.5;

const normalizeVector = (vector) => {
  // length of the vector
  //const magnite
}

export default function App() {

const targetPositionX = useSharedValue(0);
const targetPositionY = useSharedValue(0);

const direction = useSharedValue({ x: 1, y: 0});


useEffect(()=>{
  const interval = setInterval(update, DELTA);
  return ()=> clearInterval(interval);
}, []);


const update = ()=> {
  
targetPositionX.value = withTiming
(
  targetPositionX.value + directionX.value * SPEED, 
  {
    duration: DELTA,
    easing: Easing.linear,
  }

);

targetPositionY.value = withTiming
(
  targetPositionY.value + directionY.value * SPEED,
  {
    duration: DELTA,
    easing: Easing.linear,
  }
);

};

  const ballanimatedStyle = useAnimatedStyle(() => {
    return {
      top: targetPositionY.value,
      left: targetPositionX.value,
    };

  });

  return (
    <View style={styles.container}>
      
      <Animated.View style={[styles.ball, ballanimatedStyle]}/>
      
      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  ball: {
    backgroundColor: "black",
    width: 25,
    aspectRatio: 1,
    borderRadius: 25,
    position: "absolute",
    left: 70,
  },

});
