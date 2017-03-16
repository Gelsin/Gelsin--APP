import React, {Component} from 'react';
import {View,Container, Header, Title, Content, Footer, FooterTab, Button, Body, Icon, H3, Text, Form, Item, Input,Card,CardItem,Left,Right,InputGroup} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage,Picker,AlertIOS,TextInput,Alert} from 'react-native';

export default class SelectAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedBranchID: null,
            branchAddresses: []
        }

    }

    onSubmit() {
        if (this.state.selectedBranchID == null || this.state.selectedBranchID == "0") {
            Alert.alert("Xahiş edirik", "Adres seçimi edəsiniz");
        }
        else {
            Actions.category({branchID: this.state.selectedBranchID});
    }
}


    getBranchAddresses()
    {
        fetch('http://gelsin.az/app/api/branch/addresses', {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({branchAddresses: responseJson.branches}, ()=>console.log("Branch adresleri: ",this.state.branchAddresses));
            })
            .catch((error) => {
                console.error(error);
            });
    }


    componentDidMount()
    {
       this.getBranchAddresses();
    }



    render() {
        const styles = {
            header: {
                backgroundColor: '#524656',
                alignItems: 'center',
                flexDirection: 'row'
            },
            item: {
                flexDirection: 'column'
            },
            container: {
                backgroundColor: '#524656',
                flex: 1,
                justifyContent: 'space-between'

            }
        };


        return (
            <Container style={styles.container}>
                <Header style={styles.header}>
                        <Button transparent onPress={()=>Actions.auth()}>
                            <Icon name="arrow-back" style={{color: '#E5DDCB'}}></Icon>
                        </Button>
                    <Body>
                    <Text style={{letterSpacing: 0.5,color: '#E5DDCB',fontFamily: 'SourceSansPro-semiBold'}}>ADRES</Text>
                    </Body>
                </Header>



                        <Picker
                            style={{width: 250, height: 300,margin: 80,backgroundColor: '#FFF'}}
                            iosHeader="Select one"
                            mode="dropdown"

                            prompt={"Adres"}
                            selectedValue={this.state.selectedBranchID}
                            value={this.state.selectedBranchID}
                            onValueChange={(value)=>this.setState({
                                    selectedBranchID : value},()=>console.log("Street Line: ",this.state.selectedBranchID))}>
                            <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label="" value={"0"} />
                            {this.state.branchAddresses.map((address,i) =>
                                {
                                    return <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label={address.street_name} value={address.id} key={i}/>}
                            )}
                        </Picker>


                <Footer style={{"backgroundColor": '#524656',alignItems: 'center',justifyContent: 'center'}}>
                        <View>
                            <Button rounded
                                    style={{backgroundColor: '#EB7B59', width: 120,height: 30,justifyContent: 'center'}}
                                    onPress={()=>this.onSubmit()}>
                                <Text style={{fontFamily: 'SourceSansPro-Regular'}}>Irəli</Text>
                            </Button>
                        </View>
                </Footer>
            </Container>
        );

    }
}