import { StyleSheet } from 'react-native';
import useThemedStyles from '../hooks/useThemedStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

function SafeScreen({children}) {
    const styles = useThemedStyles(getStyles);

  return (
    <SafeAreaView style={styles.container}>
        {children}
    </SafeAreaView>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.background
  },
})

export default SafeScreen;