import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import List from './List';
import Form from './Form';
import FormSurvey from './FormSurvey';

import addIcon from './Icon/add.png';

const RouteConfig = {
    List: {
        screen: List,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'List plan',
            headerRight: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Form')}
                >
                    <Image
                        source={addIcon}
                        style={{
                            width: 28,
                            height: 28,
                            tintColor: '#6b52ae',
                            marginRight: 10
                        }} />
                </TouchableOpacity>
            )
        })
    },
    Form: {
        screen: Form,
        navigationOptions: {
            headerTitle: 'Form'
        }
    },
    FormSurvey: {
        screen: FormSurvey,
        navigationOptions: {
            headerTitle: 'Add survey'
        }
    }
};

const StackConfig = {
    navigationOptions: {
        headerTintColor: '#6b52ae'
    }
};

export default App = StackNavigator(RouteConfig, StackConfig);