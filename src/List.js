import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Alert,
    DeviceEventEmitter
} from 'react-native';

import { PlanServices } from './Db/PlanServices';
import planData from './Db/fakeData';

const { width, height } = Dimensions.get('window');

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plans: null
        };
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('onRefresh', () => {
            this.setState({ plans: PlanServices.get() });
        });
    }

    componentDidMount() {
        this.setState({ plans: PlanServices.get() });
    }

    renderRow() {
        const { plans } = this.state;
        if (!plans) {
            return <Text>Empty!</Text>;
        }

        return plans.map((item, index) => (
            <View
                key={index}
                style={{
                    height: height * 0.15,
                    backgroundColor: '#6b52ae',
                    marginTop: 5,
                    justifyContent: 'center',
                    paddingLeft: 10
                }}
            >
                <Text style={{color: '#FFF'}}>{`Plan id: ${item.id}`}</Text>
                <Text style={{color: '#FFF'}}>{`Plan name: ${item.name}`}</Text>
                <Text style={{color: '#FFF'}}>{`Round name: ${item.round}`}</Text>
                <Text style={{ color: '#FFF' }}>{`Store code: ${item.storeCode}`}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.removePlan(item.id) } >
                        <Text style={{color: '#e91e63'}}>Remove</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FormSurvey', {planId: item.id}) } >
                        <Text style={{color: 'yellow'}}>Add survey</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ));
    }

    removePlan(id) {
        if (!id || id === undefined || id === '') {
            return;
        }

        Alert.alert(
            '',
            'Are you sure?', [
                {
                    text: 'Ok', onPress: () => {
                        PlanServices.remove(id).then(() => {
                            this.setState({ plans: PlanServices.get() });
                        }).catch(e => {
                            console.log(e);
                        });
                    }
                },
                {
                    text: 'Cancel', onPress: () => console.log('Cancel')
                }
            ],
            { cancelable: false }
        );
    }

    onAdd() {
        const { text } = this.state;
        if (!text || text === '') return;

        PlanServices.Add(text, '2017-08');

        this.setState({
            plans: PlanServices.get(),
            text: ''
        })

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
                <ScrollView>
                    {this.renderRow()}
                </ScrollView>
            </View>
        );
    }
}