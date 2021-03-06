import React, {Component} from 'react';
import {View,Container, Header, Title, Content, Footer, FooterTab, Button, Body, Icon, H3, Text, Form, Item, Input,Card,CardItem,Left,Right,InputGroup} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {AsyncStorage,Picker,Alert,TextInput} from 'react-native';

export default class NewAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressLine: this.props.adres!=undefined ? this.props.adres.address_line: null,
            selectedBranchID: this.props.adres!=undefined ? this.props.adres.branch_address_id:null,
            token: '',
            user: String,
            branchAddresses: [],
            pageName: this.props.adres ? "mövcud adres" : "yeni adres"
        }

    }


    getUser(token)
    {
        console.log("getting user");

        fetch('http://gelsin.az/app/api/auth/user?token=' + token, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
            if(responseJson.message == "authenticated user is customer") {
                this.setState({user: responseJson.user}, () => console.log("User: ", this.state.user));
            }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    getToken = async () => {
        try {
            var value = await AsyncStorage.getItem('@Gelsin:auth_user');
            if (value != null){
                this.setState({token: value},this.getUser(value),this.getBranchAddresses());
            } else {
                console.log("value null oldu.");
            }
        } catch (error) {
            console.log(error);
        }
    };


    AddEditAdres()
    {
        if(this.props.adres == null)
        {
            if(this.state.addressLine != null) {
                //add Address
                fetch("http://gelsin.az/app/api/address/add", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({
                        token: this.state.token,
                        user_id: this.state.user.id,
                        branch_address_id: this.state.selectedBranchID,
                        address_line: this.state.addressLine
                    })
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        if (responseData.message != "success") {
                            Alert.alert("Adres əlavə edildi.");
                            console.log("responseData: ", responseData);
                        }

                    })
                    .done();
            }
            else{
                Alert.alert("Hörmətli müştəri","Xahiş olunur adres açıqlaması qismini boş buraxmayın.");
                return;
            }
        }
        else
        {
            //edit Address

            fetch("http://gelsin.az/app/api/address/update" ,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({token: this.state.token, address_id: this.props.adres.id, branch_address_id: this.state.selectedBranchID, address_line: this.state.addressLine})})
                .then((response) => response.json())
                .then((responseData) => {
                    if(responseData.message !="success") {
                        Alert.alert("Adres yeniləndi.");
                        console.log("responseData: ",responseData);
                    }

                })
                .done();

        }
    }

    getBranchAddresses()
    {
        // if(this.props.adres == null)
        // {
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
        // }
        // else {
        //     fetch('http://gelsin.az/app/api/branch/addresses', {method: 'GET'})
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //             this.setState({branchAddresses: responseJson.branches}, () => console.log("Branch adresleri: ", this.state.branchAddresses));
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //         });
        // }
    }


    componentDidMount()
    {
        this.getToken();
        if(this.state.addressLine != null && this.state.branchAddresses !=null)
        {
            console.log("PROPS: ",this.props);

        }
        else
        {

        }
    }



    render() {
        const styles = {
            header: {
                backgroundColor: '#524656',alignItems: 'center'
            },
            item: {
                flexDirection: 'column'
            },
            footerStyle: {
                    backgroundColor: '#524656',
            }
        };


            return (
                <Container>
                    <Header style={styles.header}>
                        <Left style={{ flex: 1}}>
                            <Button transparent onPress={()=>Actions.pop()}>
                                <Icon style={{color: '#e5ddcb'}} name='ios-arrow-round-back'/>
                            </Button>
                        </Left>

                        <Body style={{ flex: 7}}>
                        <Title style={{alignSelf: 'center', color: '#e5ddcb',fontFamily: 'SourceSansPro-Regular'}}>GƏLSİN</Title>
                        </Body>

                        <Right style={{ flex: 1}}/>

                    </Header>

                    <Content style={{marginTop: 30}}>
                        <Form>
                            <H3 style={{color: '#EB7B59',fontFamily: 'SourceSansPro-semiBold',paddingLeft: 14}}>{this.state.pageName ? this.state.pageName:"yeni adres"}</H3>

                                <Picker
                                    selectedValue={this.state.selectedBranchID}
                                    value={this.state.selectedBranchId}
                                    onValueChange={(value)=>this.setState({
                                    selectedBranchID : value},()=>console.log("Street Line: ",this.state.selectedBranchID))}>
                                    {this.state.branchAddresses.map((address,i) =>
                                         {
                                             return <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label={address.street_name} value={address.id} key={i}/>}
                                    )}
                                </Picker>

                            <Item>
                                <Input
                                    style={{left: 15,color: '#524656',paddingLeft: 0,fontFamily: 'SourceSansPro-Regular',height: 40 }}
                                    placeholder="adres açıqlaması"
                                    value={this.state.addressLine}
                                    editable={true}
                                    autoCapitalize={"none"}
                                    autoCorrect={false}
                                    onChangeText={(Line) => this.setState({addressLine: Line},()=>console.log("this state adresLine: ",this.state.addressLine))}
                                />
                            </Item>

                        </Form>
                    </Content>

                    <Footer style={styles.footerStyle}>
                        <FooterTab style={{flex: 1,backgroundColor: '#524656'}}>
                            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                                <Button transparent onPress={()=>Actions.addresses()}>
                                    <Text style={{fontFamily: 'SourceSansPro-Regular',marginTop: 10, color: '#FFF'}}>Geri</Text>
                                </Button>
                                <Button rounded
                                        style={{backgroundColor: '#EB7B59',marginTop: 10,marginRight: 15, width: 120,height: 30,justifyContent: 'center'}}
                                        onPress={()=>this.AddEditAdres()}>
                                    <Text style={{fontFamily: 'SourceSansPro-Regular'}}>Save</Text>
                                </Button>
                            </View>
                        </FooterTab>
                    </Footer>
                </Container>
            );

    }
}