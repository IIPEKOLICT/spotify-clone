import { FC } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

interface IProps {
    navigation: any;
};

export const LoginPage: FC<IProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>LoginPage</Text>
            <Button
                title="Go to Home"
                onPress={() =>
                    navigation.navigate('Home')
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