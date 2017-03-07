import React, {Component} from 'react';
import {View,Container, Header, Title, Content, Footer, FooterTab, Button, Body, Icon, H3, Text, Form, Item, Picker,Input,Card,CardItem,Left,Right} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';

export default class NewAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 'key0',
            selected1: 'rayon0'
        }
    }

    onSeherChange (value: string) {
        this.setState({
            selected : value
        });
    }

    onRayonChange (value: string) {
        this.setState({
            selected1 : value
        });
    }


    componentDidMount()
    {
    }

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
                    <Left style={{ flex: 1}}>
                        <Button transparent>
                            <Icon name='arrow-back' style={{color: '#FFF'}}/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}} >
                    <Title style={{alignSelf: 'center',color: '#E5DDCB',paddingLeft: 20,fontFamily: 'SourceSansPro-Regular'}}>GƏLSİN</Title>
                    </Body>
                </Header>

                <Content style={{marginTop: 30}}>
                    <Form>
                        <H3 style={{color: '#EB7B59',fontFamily: 'SourceSansPro-semiBold',paddingLeft: 14}}>New address</H3>

                        <Item >
                           <Picker
                               iosHeader="Select one"
                               mode="dropdown"
                               selectedValue={this.state.selected}
                               onValueChange={this.onSeherChange.bind(this)}>
                               <Item label="Baku" value="key0" />
                               <Item label="Sumqayit" value="key1" />
                               <Item label="Gence" value="key2" />
                           </Picker>
                        </Item>

                        <Item >
                            <Picker
                                iosHeader="Select one"
                                mode="dropdown"
                                selectedValue={this.state.selected1}
                                onValueChange={this.onRayonChange.bind(this)}>
                                <Item label="Yasamal" value="rayon0" />
                                <Item label="Nizami" value="rayon1" />
                                <Item label="Nəsimi" value="rayon2" />
                                <Item label="Binəqədi" value="rayon3" />
                            </Picker>
                        </Item>

                        <Item>
                           <Input style={{left: 15,color: '#524656',paddingLeft: 0}}placeholder="adres açıqlaması"/>
                        </Item>

                        <Item>
                            <Input style={{left: 15,color: '#524656',paddingLeft: 0}} placeholder="adres açıqlaması"/>
                        </Item>
                    </Form>
                </Content>

                <Footer style={{"backgroundColor": '#524656'}}>
                    <FooterTab style={{flex: 1}}>
                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                            <Button transparent>
                                <Text style={{fontFamily: 'SourceSansPro-Regular',marginTop: 10, color: '#FFF'}}>Cancel</Text>
                            </Button>
                            <Button rounded style={{backgroundColor: '#EB7B59',marginTop: 10,marginRight: 15, width: 120,height: 30,justifyContent: 'center'}}>
                                <Text style={{fontFamily: 'SourceSansPro-Regular'}}>Save</Text>
                            </Button>
                        </View>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}