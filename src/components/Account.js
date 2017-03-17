import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Form,
    Item,
    ListItem,
    Separator,
    Label
} from 'native-base';
import {Actions} from 'react-native-router-flux';


export default class Account extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = {email: '', fullname: '', error: '', loading: false, token: ''};
        console.log(this.state);
    };

    componentWillMount() {
        console.log("will mount");
    };


    componentDidMount() {
        console.log("mounted");
        this.getToken();
    };

    getToken = async () => {
        try {
            var value = await AsyncStorage.getItem('@Gelsin:auth_user');
            if (value !== null){
                //console.log(value);
                this.setState({token: value});
                console.log(this.state.token);

                this.getUser(this.state.token)

            } else {
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    getUser(token) {
        console.log("get user function");

        fetch('http://gelsin.az/app/api/auth/user?token=' + this.state.token, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                if (responseJson.user) {
                    this.setState({
                        email: responseJson.user.email,
                        fullname: responseJson.user.customer_detail.fullname,
                        contact: responseJson.user.customer_detail.contact,
                        loading: false
                    });

                    console.log(this.state);
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    logout = async () => {
        console.log('logout');

        fetch('http://gelsin.az/app/auth/invalidate', {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => console.log(response)
                // .then((responseData) => {
                //     console.log("inside responsejson");
                //     console.log('response object:', responseData);
                //
                // })
                // .catch((error) => {
                //     console.log(error);
                // })
            )
            .catch((error) => {
                console.log(error);
            });

        try {
            await AsyncStorage.removeItem('@Gelsin:auth_user');
            Actions.auth();
        } catch (error) {
            this.setState({error: error.message});
        }
    };


    render() {
        const styles = {
            header: {
                backgroundColor: '#524656',
            },
            item: {
                flexDirection: 'column'
            }
        };

        return (
            <Container >
                <Header style={styles.header}>
                    <Left style={{ flex: 1}} >
                        <Button transparent onPress={()=>Actions.category()}>
                            <Icon style={{color: '#e5ddcb'}} name='ios-arrow-round-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center', color: '#e5ddcb'}}>Settings</Title>
                    </Body>

                    <Right style={{ flex: 1}}/>
                </Header>

                <Content>
                    <Separator style={{backgroundColor: '#fff'}}>
                        <Text
                            style={{ fontFamily: 'SourceSansPro-Semibold', fontSize: 16, color: '#eb7b59'}}>Profile</Text>
                    </Separator>

                    <Form>
                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Name Surname</Text>
                            <Text note
                                  style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>{this.state.fullname}</Text>
                        </ListItem>

                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Email</Text>
                            <Text note
                                  style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>{this.state.email}</Text>
                        </ListItem>

                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Address</Text>

                            <Button transparent style={{padding:0, margin:0}} onPress={()=>Actions.addresses()}>
                                <Text note
                                      style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>Edit Addresses</Text>
                            </Button>
                        </ListItem>
                    </Form>


                    <Separator style={{backgroundColor: '#fff', height: 16}}>
                    </Separator>

                    <Separator style={{backgroundColor: '#fff'}}>
                        <Text
                            style={{ fontFamily: 'SourceSansPro-Semibold', fontSize: 16, color: '#eb7b59'}}>Account</Text>
                    </Separator>

                    <Form>
                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Phone</Text>
                            <Text note
                                  style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>{this.state.contact}</Text>
                        </ListItem>

                        <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Password</Text>
                            <Text note
                                  style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>Change password</Text>
                        </ListItem>
                    </Form>

                    <Separator style={{backgroundColor: '#fff', height: 16}}>
                    </Separator>

                    <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                        <Text
                            style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Language</Text>
                        <Text note
                              style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Semibold', fontSize: 14, color: '#524656'}}>English</Text>
                    </ListItem>

                    <ListItem style={{paddingTop: 8, paddingBottom: 8, flexDirection: 'column'}}>
                        <Button transparent style={{padding:0, margin:0}} onPress={this.logout.bind(this)}>
                            <Text
                                style={{alignSelf: 'flex-start', fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#524656'}}>Logout</Text>
                        </Button>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}