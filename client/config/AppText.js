import { StyleSheet, Text, Platform } from 'react-native';

function AppText({children, style, ...otherProps }) {
    return (
        <Text style={[styles.text, style]} {...otherProps}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text:{
        fontFamily: Platform.OS === 'android' ? 'roboto' : 'San Francisco',
        letterSpacing:-.5
    }
})

export default AppText;