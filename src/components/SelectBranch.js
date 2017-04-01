import React, {Component} from 'react';
import {Dimensions, AsyncStorage,Picker,Alert} from 'react-native';
import {Container, Form, H3, Header, Footer, Button, Text, Spinner,Card,Left,Body,Content,ListItem, Radio} from 'native-base';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';

const {width, height} = Dimensions.get("window"),
    vw = width / 100
vh = height / 100
export default class SelectBranchAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedBranchID: 1,
            branchAddresses: [],
            selectedValue: 1,
            selectedIndex: 0,
            selectedAddress: ''
        }

    }


    writeAddressToDevice = async() =>
    {
        try {
            await AsyncStorage.setItem('@Gelsin:SelectedAddress', JSON.stringify(this.state.selectedBranchID));
        } catch (error) {
            console.log(error);
        }
    }

    onSubmit() {
        this.writeAddressToDevice();
        Actions.selectBranchAddress();
    }






    onValChange(val)
    {
        this.setState({selectedBranchID: val},()=>console.log("selected branchID: ",this.state.selectedBranchID));
    }




    getBranchAddresses()
    {
        fetch('http://gelsin.az/app/api/branches', {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({branchAddresses: responseJson.branches}, ()=>console.log("Branch adresleri: ",this.state.branchAddresses));
                this.setState({selectedBranchID: responseJson.branches[0].id});
            })
            .catch((error) => {
                console.error(error);
            });


    }


    componentWillMount()
    {
        this.getBranchAddresses();

    }



    render() {


        const styles = {
            container: {
                backgroundColor: '#524656',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 0.1
            },
            content: {
                flex: 1,
                width: Dimensions.get('window').width * 0.8
            },
            header: {
                backgroundColor: 'transparent',
                alignItems: 'flex-end',
                elevation: 0,
                shadowOpacity: 0,
                height: Dimensions.get('window').height * 0.15,
            },
            title: {
                color: '#e5ddcb',
                letterSpacing: 0.5,
                fontSize: 16,
                fontFamily: 'SourceSansPro-Semibold'
            },
            formRow: {
                justifyContent: 'center'
            },
            form: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            },
            button: {
                alignSelf: 'center',
            },
            text: {
                textAlign: 'center',
                alignSelf: 'center',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'SourceSansPro-Regular'
            },
            footer: {
                backgroundColor: 'transparent'
            }
        };


        return (

            <Container style={styles.container}>
                <Header style={styles.header}>
                    <H3 style={styles.title}>ŞÖBƏ</H3>
                </Header>

                <Content style={{width: width}}>
                    {this.state.branchAddresses.map((address, i) => {
                            return (
                                <ListItem selected={this.state.selectedIndex==i} key={i}
                                          onPress={()=>this.setState({selectedIndex: i,
                                        selectedAddress: address.address_line},
                                        ()=>this.onValChange(address.id))}>
                                    <Left style={{ flex: 1}}>
                                        <Radio selected={this.state.selectedIndex==i}
                                               onPress={()=>this.setState({selectedIndex: i,
                                        selectedAddress: address.address_line},
                                        ()=>console.log(this.state.selectedAddress))}
                                        />
                                    </Left>
                                    <Body style={{ flex: 9,alignItems: 'center'}}>
                                    <Text
                                        style={{alignSelf: 'flex-start', marginLeft: 0, fontFamily: 'SourceSansPro-Regular',color: '#FFF'}}>
                                        {address.address_line}
                                    </Text>
                                    </Body>
                                </ListItem>

                            );
                        }
                    )}
                    <ButtonRound onPress={()=>this.onSubmit()} text="Irəli"/>
                </Content>

            </Container>

        );

    }
}