import React, {Component} from 'react';
import {Dimensions, AsyncStorage,Picker,Alert} from 'react-native';
import {Container, Form, H3, Header, Footer, Button, Text, Spinner} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';

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
            Actions.main({branchID: this.state.selectedBranchID});
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
            /*<Container style={styles.container}>*/
                // <Header style={styles.header}>
                //         <Button transparent onPress={()=>Actions.account()}>
                //             <Icon name="arrow-back" style={{color: '#E5DDCB'}}></Icon>
                //         </Button>
                //     <Body>
                //     <Text style={{letterSpacing: 0.5,color: '#E5DDCB',fontFamily: 'SourceSansPro-semiBold'}}>ADRES</Text>
                //     </Body>
                // </Header>
                //
                //
                //
                //         <Picker
                //             style={{width: 250, height: 300,margin: 80,backgroundColor: '#FFF'}}
                //             iosHeader="Select one"
                //             mode="dropdown"
                //
                //             prompt={"Adres"}
                //             selectedValue={this.state.selectedBranchID}
                //             value={this.state.selectedBranchID}
                //             onValueChange={(value)=>this.setState({
                //                     selectedBranchID : value},()=>console.log("Street Line: ",this.state.selectedBranchID))}>
                //             <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label="" value={"0"} />
                //             {this.state.branchAddresses.map((address,i) =>
                //                 {
                //                     return <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label={address.street_name} value={address.id} key={i}/>}
                //             )}
                //         </Picker>
                //
                //
                // <Footer style={{"backgroundColor": '#524656',alignItems: 'center',justifyContent: 'center'}}>
                //         <View>
                //             <Button rounded
                //                     style={{backgroundColor: '#EB7B59', width: 120,height: 30,justifyContent: 'center'}}
                //                     onPress={()=>this.onSubmit()}>
                //                 <Text style={{fontFamily: 'SourceSansPro-Regular'}}>Irəli</Text>
                //             </Button>
                //         </View>
                // </Footer>
            // </Container>


            <Container style={styles.container}>
                <Header style={styles.header}>
                    <H3 style={styles.title}>ADRES</H3>
                </Header>


                <Grid style={styles.content}>
                    <Row size={3} style={styles.formRow}>
                        <Form style={styles.form}>

                            <Picker
                                style={{width: 250, height: 300,margin: 80,backgroundColor: '#FFF'}}
                                iosHeader="Select one"
                                mode="dialog"
                                selectedValue={this.state.selectedBranchID}
                                value={this.state.selectedBranchID}
                                onValueChange={(value)=>this.setState({
                                    selectedBranchID : value},()=>console.log("Street Line: ",this.state.selectedBranchID))}>
                                <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label="" value={"0"} />
                                {this.state.branchAddresses.map((address,i) =>
                                    {
                                        return <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label={address.street_name} value={address.branch_id} key={i}/>}
                                )}
                            </Picker>


                            <ButtonRound onPress={()=>this.onSubmit()} text="Irəli"/>
                        </Form>
                    </Row>
                </Grid>
            </Container>

        );

    }
}