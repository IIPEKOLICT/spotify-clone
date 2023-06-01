import { FC } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { paths } from './pathes';
import { AuthType, RoutePath } from '../constants/enums';
import { HomePage, LoginPage } from '../pages';

interface IProps {
    isAuth: boolean;
};

export const Router: FC<IProps> = ({ isAuth }) => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={RoutePath.LOGIN}
                component={LoginPage}
                options={{ title: 'login' }}
            />
            <Stack.Screen
                name={RoutePath.REGISTRATION}
                component={LoginPage}
                options={{ title: 'registration' }}
            />
        </Stack.Navigator>
    );
};