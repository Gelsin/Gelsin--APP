import React, {Component} from 'react';
import {Dimensions, AsyncStorage} from 'react-native';
import {Container, Form, H3, Header, Footer, Button, Text, Spinner, Item, Picker} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';
import SmartPicker from 'react-native-smart-picker';

class GetAddress extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = {
            branches: [],
            error: '',
            loading: true,
            selectedBranch: null,
            branchAddresses: [],
            selectedBranchAddress: null
        };
        console.log(this.state);
    };

    componentWillMount() {
        this.getBranches();
        console.log("will mount");

    };


    componentDidMount() {
        console.log("mounted");
    };


    writeAddressToDevice = async() =>
    {
        console.log("WriteToDevice");

        try {
            await AsyncStorage.setItem('@Gelsin:SelectedAddress', JSON.stringify(this.state.selectedBranch)).then(this.getBranchAddresses());
        } catch (error) {
            console.log(error);
        }
    }


    getBranches()
    {
        console.log("GET BRANCHES CAGRILDI");
        fetch('http://gelsin.az/app/api/branches', {method: 'GET'})
            .then((response) => response.json()
                .then((responseJson) => {
                this.setState({branches: responseJson.branches}, ()=>console.log("Branchlar: ",this.state.branches));
                this.setState({selectedBranchID: responseJson.branches[0].id});
            })
                .catch((error) => {
                    console.log(error);
                })).
            catch((error) => {
            console.log(error);
        });
    }


    getBranchAddresses()
    {
        var branchid;

        AsyncStorage.getItem("@Gelsin:SelectedAddress").then((value) => {
            if(value != null) {
                branchid=value;

                var Url = 'http://gelsin.az/app/api/branches/' + branchid +  '/addresses';
                fetch(Url, {method: 'GET'})
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({branchAddresses: responseJson.addresses}, ()=>console.log("Branch adresleri: ",this.state.branchAddresses));
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            else
                console.log("get Error on read from device storage");
        }).done();
    }


     onBranchSelected(selectedValue)
    {
        console.log("Secilen Branches: ",selectedValue);
        this.setState({selectedBranch: selectedValue},()=>this.writeAddressToDevice());
    }


    nananay()
    {
        console.log("KUlFETINI SIKIM");
    }


    onBranchAddressSelected(selectedValue)
    {
        this.setState({selectedBranchAddress: selectedValue, loading: false},()=>console.log("Selected Branch Address: ", this.state.selectedBranchAddress));
        console.log("Branch Address Selected");
    }


    renderButton() {
        if (this.state.loading) {
            return (
                <Spinner color='#eb7b59'/>
            )
        }
        return (
            <ButtonRound onPress={()=>Actions.category()} text="Next"/>
        );
    }

    render() {

        const styles = {
            container: {
                backgroundColor: '#524656',
                alignItems: 'center'
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
                {/*<Content style={styles.content}>*/}
                <Header style={styles.header}>
                    <H3 style={styles.title}>ADDRESS</H3>
                </Header>

                <Grid style={styles.content}>
                    <Row size={3} style={styles.formRow}>
                        <Form style={styles.form}>
                            <Item style={{justifyContent: 'space-between', marginBottom: 30}}>
                                <Picker style={{ width: 200, height: 40}}
                                    iosHeader="Branch"
                                    Header="Branch"
                                    mode="dropdown"
                                    textStyle={{color: 'white'}}
                                    placeholder="Branch"
                                    headerBackButtonText="Geri"
                                    selectedValue={this.state.selectedBranch}
                                    onValueChange={(value)=>this.onBranchSelected(value)}
                                >
                                    {this.state.branches.map((branches, i)=>{
                                            return(
                                                <Picker.Item label={branches.address_line} value={branches.id} key={i}/>
                                            );
                                        }
                                    )}
                                </Picker>
                            </Item>
                            <Item>
                                <Picker style={{ width: 200, height: 40}}
                                    iosHeader="Branch Address"
                                    mode="dropdown"
                                    headerBackButtonText="Geri"
                                    textStyle={{color: 'white'}}
                                    placeholder="Branch Address"
                                    selectedValue={this.state.selectedBranchAddress}
                                    onValueChange={this.onBranchAddressSelected.bind(this)}
                                >
                                    {this.state.branchAddresses.map((address, k)=>{
                                            return(
                                                <Picker.Item label={address.street_name} value={address.id} key={k}/>
                                            );
                                        }
                                    )}

                                </Picker>
                            </Item>


                            {this.renderButton()}

                            <Button autoCapitalize="none" style={styles.button} transparent>
                                <Text autoCapitalize="none" style={styles.text}>Get my Location</Text>
                            </Button>

                            <Text style={styles.text}>{this.state.error}</Text>
                        </Form>
                    </Row>
                </Grid>

                {/*</Content>*/}
            </Container>
        );
    }
}

export default GetAddress;
