import React, {Component} from 'react';
import {View,Container, Header, Title, Content, Footer, FooterTab, Button, Body, Icon, H3, Text, Form, Item, Picker,Input,Card,CardItem,Left,Right} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';

export default class Addresses extends Component {

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
                        <H3 style={{color: '#EB7B59',fontFamily: 'SourceSansPro-Regular',paddingLeft: 14}}>Mövcud adresləriniz</H3>

                        {/*<Button transparent>*/}
                                {/*<Body>*/}
                                    {/*<Text>Yasamal Is</Text>*/}
                                    {/*<Text note>Adres 1 Yasamal Serifzade</Text>*/}
                                {/*</Body>*/}
                        {/*</Button>*/}

                    <Card>
                            <Button transparent>
                            <Left>
                                <Body>
                                <Text>Ev 1</Text>
                                <Text note>Adres 1 Yasamal Serifzade 28, No 33</Text>
                                </Body>
                            </Left>
                            </Button>
                    </Card>
                    <Card>
                    <Button transparent>
                            <Left>
                                <Body>
                                <Text>Ev 1</Text>
                                <Text note>Adres 1 Yasamal Serifzade 28, No 33</Text>
                                </Body>
                            </Left>
                            </Button>
                    </Card>
                    <Card>
                    <Button transparent>
                            <Left>
                                <Body>
                                <Text>Ev 1</Text>
                                <Text note>Adres 1 Yasamal Serifzade 28, No 33</Text>
                                </Body>
                            </Left>
                            </Button>
                    </Card>
                    <Card>
                    <Button transparent>
                            <Left>
                                <Body>
                                <Text>Ev 1</Text>
                                <Text note>Adres 1 Yasamal Serifzade 28, No 33</Text>
                                </Body>
                            </Left>
                            </Button>
                    </Card>


                    {/*<Item >*/}
                            {/*<Button transparent>*/}
                                {/*<Text style={{fontFamily: 'SourceSansPro-Bold'}}>ASDAS</Text>*/}
                                {/*<Text style={{fontFamily: 'SourceSansPro-Regular'}}>Adres 1 Yasamal Serifzade</Text>*/}
                            {/*</Button>*/}
                        {/*</Item>*/}
                        {/*<Item>*/}
                            {/*<Button transparent>*/}
                                {/*<Text>Adres 2 Nerimanov Tebriz kucesi</Text>*/}
                            {/*</Button>*/}
                        {/*</Item>*/}
                        {/*<Item >*/}
                            {/*<Button transparent>*/}
                                {/*<Text>Adres 3 Bineqedi Suleyman Axundov kucesi</Text>*/}
                            {/*</Button>*/}
                        {/*</Item>*/}
                        {/*<Item>*/}
                            {/*<Button transparent>*/}
                                {/*<Text>Adres 4 Sebayil rayonu Neftciler pr.</Text>*/}
                            {/*</Button>*/}
                        {/*</Item>*/}
                </Content>

                <Footer style={{"backgroundColor": '#524656'}}>
                    <FooterTab style={{flex: 1}}>
                        {/*<View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>*/}
                            {/*<Button transparent>*/}
                                {/*<Text style={{fontFamily: 'SourceSansPro-Regular',marginTop: 10, color: '#FFF'}}>Cancel</Text>*/}
                            {/*</Button>*/}
                            {/*<Button rounded style={{backgroundColor: '#EB7B59',marginTop: 10,marginRight: 15, width: 120,height: 30,justifyContent: 'center'}}>*/}
                                {/*<Text style={{fontFamily: 'SourceSansPro-Regular'}}>Save</Text>*/}
                            {/*</Button>*/}
                        {/*</View>*/}

                        <Button transparent>
                           <Text style={{fontFamily: 'SourceSansPro-SemiBold', color: '#FFF'}}>Yeni adres</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}