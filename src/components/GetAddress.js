import React, {Component} from 'react';
import {Dimensions, AsyncStorage} from 'react-native';
import {Container, Form, H3, Header, Footer, Button, Text, Spinner, Picker, Item} from 'native-base';
import {Grid, Row} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';
import  IconInput  from './common/IconInput';
const PickItem = Picker.Item;
class GetAddress extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = {
            branches: [],
            error: '',
            loading: false,
            selectedBranch: '',
            branchAddresses: [],
            selectedBranchAddress: ''
        };
        console.log(this.state);
    };

    componentWillMount() {
        console.log("will mount");
        this.getBranches();
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
        this.setState({loading: true});

        fetch('http://gelsin.az/app/api/branches', {method: 'GET'})
            .then((response) => response.json()
                .then((responseJson) => {
                this.setState({branches: responseJson.branches}, ()=>console.log("Branchlar: ",this.state.branches));
                this.setState({selectedBranchID: responseJson.branches[0].id});
            })
                .catch((error) => {
                    console.log(error);
                    this.setState({loading: false});
                })).
            catch((error) => {
            console.log(error);
            this.setState({loading: false});
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
        console.log("VALUE: ",selectedValue);
        this.setState({selectedBranch: selectedValue},()=>this.writeAddressToDevice());
    }


    onBranchAddressSelected(selectedValue)
    {
        this.setState({selectedBranchAddress: selectedValue, loading: false},()=>console.log("Selected Branch Address: ", this.state.selectedBranchAddress));
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
                            <Item>
                                <Picker style={{ width: 200}}
                                    iosHeader="Branch"
                                    mode="dropdown"
                                    textStyle={{color: 'white'}}
                                    placeholder="Branch"
                                    selectedValue={this.state.selectedBranch}
                                    onValueChange={(value)=>this.onBranchSelected(value)}
                                >
                                    {this.state.branches.map((branches, i)=>{
                                            return(
                                                <PickItem label={branches.address_line} value={branches.id} key={i}/>
                                            );
                                        }
                                    )}
                                </Picker>
                            </Item>
                            <Item>
                                <Picker style={{ width: 200}}
                                    iosHeader="Branch Address"
                                    mode="dropdown"
                                    textStyle={{color: 'white'}}
                                    placeholder="Branch Address"
                                    selectedValue={this.state.selectedBranchAddress}
                                    onValueChange={(value)=>this.onBranchAddressSelected(value)}
                                >
                                    {this.state.branchAddresses.map((address, i)=>{
                                            return(
                                                <PickItem label={address.street_name} value={address.id} key={i}/>
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
