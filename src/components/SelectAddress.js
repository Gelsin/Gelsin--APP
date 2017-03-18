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
            selectedBranchID: 1,
            branchAddresses: [],
            selectedValue: 1
        }

    }

    onSubmit() {
        Actions.main({branchID: this.state.selectedBranchID});
    }



onValChange(val)
{
    console.log("onValueChange Value: ",val);
    for (i=0; i<this.state.branchAddresses.length; i++)
    {

        if(this.state.branchAddresses[i].id == val)
        {
            console.log(this.state.branchAddresses[i]);
            this.setState({selectedBranchID: this.state.branchAddresses[i].branch_id},console.log("branchID'si",this.state.selectedBranchID));
            this.setState({selectedValue: this.state.branchAddresses[i].id},console.log("ID'si",this.state.selectedValue));
        }
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
                    <H3 style={styles.title}>ADRES</H3>
                </Header>


                <Grid style={styles.content}>
                    <Row size={3} style={styles.formRow}>
                        <Form style={styles.form}>

                            <Picker
                                style={{width: 250, height: 300,margin: 80,backgroundColor: '#FFF'}}
                                iosHeader="Select one"
                                mode="dropdown"
                                selectedValue={this.state.selectedValue}
                                value={this.state.selectedBranchID}
                                onValueChange={(value)=>this.onValChange(value)}>
                                {this.state.branchAddresses.map((address,i) =>
                                    {

                                        return <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label={address.street_name} value={address.id} key={i}/>}
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