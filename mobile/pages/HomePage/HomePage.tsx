import { FC } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface IProps {
    navigation: any;
};

export const HomePage: FC<IProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>HomePage</Text>
            <Button
                title="Go to Login"
                onPress={() =>
                    navigation.navigate('Login')
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});