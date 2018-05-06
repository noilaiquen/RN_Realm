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

import { SurveyServices } from './Db/SurveyServices';
import planData from './Db/fakeData';
import addIcon from './Icon/add.png';

const { width, height } = Dimensions.get('window');

export default class FormSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                surveyName: null,
                target: null,
                inputType: 'text'
            }
        };
    }

    onAdd() {
        const { surveyName, target, inputType } = this.state.form;
        if (!surveyName || !target || !inputType) {
            return;
        }
        const { planId } = this.props.navigation.state.params;

        SurveyServices.add(
            {
                surveyId: Math.floor((Math.random() * 10000) + 1),
                surveyName,
                target: Number(target),
                inputType
            }, planId)
            .then(() => {
                this.props.navigation.goBack(null);
            })
            .catch((e) => console.log('' + e));
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <View style={{ height: height * 0.08, marginTop: 5 }}>
                    <TextInput
                        placeholder={`Survey name...`}
                        style={{ width }}
                        onChangeText={(text) => this.setState({
                            form:
                            {
                                ...this.state.form,
                                surveyName: text
                            }
                        })}
                    />
                </View>
                <View style={{ height: height * 0.08, marginTop: 5 }}>
                    <TextInput
                        placeholder={`target...`}
                        keyboardType="numeric"
                        style={{ width }}
                        onChangeText={(text) => this.setState({
                            form:
                            {
                                ...this.state.form,
                                target: text
                            }
                        })}
                    />
                </View>
                <View style={{ height: height * 0.08, marginTop: 5 }}>
                    <TextInput
                        placeholder={`Store code...`}
                        editable={false}
                        style={{ width }}
                        value={this.state.form.inputType}
                        onChangeText={(text) => this.setState({
                            form:
                            {
                                ...this.state.form,
                                inputType: text
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