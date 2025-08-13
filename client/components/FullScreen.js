import { View, StyleSheet } from 'react-native';

function FullScreen({children}) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
})

export default FullScreen;