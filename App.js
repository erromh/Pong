import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, useAnimatedValue, useWindowDimensions, View } from 'react-native';
import  Animated, { 
  Easing,
  useAnimatedStyle, 
  useSharedValue,
  withTiming
 }  from 'react-native-reanimated';

 // 59:40 - time code on video

const FPS = 60;
const DELTA = 1000 / FPS;
const SPEED = 10;

const normalizeVector = (vector) => {
  // length of the vector
  const magnite = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

return({

  x: vector.x / magnite,
  y: vector.y / magnite,
})

}

export default function App() {

const targetPositionX = useSharedValue(200);
const targetPositionY = useSharedValue(200);

const direction = useSharedValue(normalizeVector({x: Math.random(), y: Math.random()}));
const {height, width} = useWindowDimensions();

useEffect(()=>{
  const interval = setInterval(update, DELTA);
  return ()=> clearInterval(interval);
}, []);


const update = ()=> {

  const nextX = targetPositionX.value + direction.value.x * SPEED;
  const nextY = targetPositionY.value + direction.value.y * SPEED;
  
  if(nextY < 0 || nextY > height) {
    direction.value = {x: direction.value.x, y: -direction.value.y};
  }
  
  if(nextX < 0 || nextX > width) {
    direction.value = {x: -direction.value.x, y: direction.value.y};
  }

  targetPositionX.value = withTiming(nextX, {
    duration: DELTA,
    easing: Easing.linear,
  }

);

targetPositionY.value = withTiming(nextY, {
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
