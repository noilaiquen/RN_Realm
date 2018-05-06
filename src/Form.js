import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Image,
    DeviceEventEmitter
} from 'react-native';

import { PlanServices } from './Db/PlanServices';
import planData from './Db/fakeData';
import addIcon from './Icon/add.png';

const { width, height } = Dimensions.get('window');

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: null,
                round: null,
                storeCode: null
            }
        };
    }

    onAdd() {
        const { name, round, storeCode } = this.state.form;
        if (!name || !round || !storeCode) {
            return;
        }

        const plan = {
            id: Math.floor((Math.random() * 10000) + 1),
            name,
            round,
            storeCode
        }

        PlanServices.add(plan)
            .then(() => {
                DeviceEventEmitter.emit('onRefresh');
                this.props.navigation.navigate('FormSurvey', {planId: plan.id});
            })
            .catch((e) => console.log('' + e));
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <View style={{ height: height * 0.08, marginTop: 5 }}>
                    <TextInput
                        placeholder={`Plan name...`}
                        style={{ width }}
                        onChangeText={(text) => this.setState({
                            form:
                            {
                                ...this.state.form,
                                name: text
                            }
                        })}
                    />
                </View>
                <View style={{ height: height * 0.08, marginTop: 5 }}>
                    <TextInput
                        placeholder={`Round name...`}
                        style={{ width }}
                        onChangeText={(text) => this.setState({
                            form:
                            {
                                ...this.state.form,
                                round: text
                            }
                        })}
                    />
                </View>
                <View style={{ height: height * 0.08, marginTop: 5 }}>
                    <TextInput
                        placeholder={`Store code...`}
                        style={{ width }}
                        onChangeText={(text) => this.setState({
                            form:
                            {
                                ...this.state.form,
                                storeCode: text
                            }
                        })}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        height: height * 0.1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#6b52ae'
                    }}
                    onPress={() => this.onAdd()}
                >
                    <Image
                        source={addIcon}
                        style={{
                            width: 28,
                            height: 28,
                            tintColor: '#FFF',
                            marginRight: 10
                        }} />
                </TouchableOpacity>
            </View>
        );
    }
}