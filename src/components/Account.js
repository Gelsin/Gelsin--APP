import React, {Component} from 'react';
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
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';


export default class Account extends Component {
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
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center'}}>Header</Title>
                    </Body>

                    <Right style={{ flex: 1}}>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    {/*<Grid>*/}
                    {/*<Row >*/}
                    {/*<Col>*/}
                    <Separator bordered>
                        <Text>Profile</Text>
                    </Separator>

                    <Form>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Text style={{alignSelf: 'flex-start'}} >Orxan Alirzayev</Text>
                        </Item>

                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Text style={{alignSelf: 'flex-start'}} >Orxan Alirzayev</Text>
                        </Item>

                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Text style={{alignSelf: 'flex-start'}} >Orxan Alirzayev</Text>
                        </Item>
                    </Form>


                    {/*<ListItem itemHeader >*/}
                        {/*<Text>Profile</Text>*/}
                    {/*</ListItem>*/}

                    <Separator bordered>
                        <Text>Profile</Text>
                    </Separator>

                    <Form>
                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Text style={{alignSelf: 'flex-start'}} >Orxan Alirzayev</Text>
                        </Item>

                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Text style={{alignSelf: 'flex-start'}} >Orxan Alirzayev</Text>
                        </Item>

                        <Item stackedLabel>
                            <Label>Username</Label>
                            <Text style={{alignSelf: 'flex-start'}} >Orxan Alirzayev</Text>
                        </Item>
                    </Form>
                    {/*</Col>*/}
                    {/*</Row>*/}
                    {/*</Grid>*/}
                </Content>

                {/*<Footer>*/}
                {/*<FooterTab>*/}
                {/*<Button full onPress={() => Actions.addresses()}>*/}
                {/*<Text>Log out</Text>*/}
                {/*</Button>*/}
                {/*</FooterTab>*/}
                {/*</Footer>*/}
            </Container>
        );
    }
}