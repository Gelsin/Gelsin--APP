import React, {Component} from 'react';
import { View, TouchableOpacity} from "react-native";
import {Text,CardItem,Thumbnail,Button} from "native-base";

export default class ProductItem extends Component {
render()
{
return(
    <CardItem horizontal={false} style={{flexDirection: 'column',borderWidth: 1,borderRadius: 4,padding: 0,marginRight: 14, borderColor: '#E5DDCB'}}>
        <Thumbnail square size={70} source={{uri: this.props.thumbnail }} style={{marginTop: 12, marginBottom: 12}}/>
        <Text>{this.props.name}</Text>
        <Button full style={{backgroundColor: '#EB7B59',height: 28,marginTop: 8, marginBottom: 8}}><Text>Add To Cart</Text></Button>
        <Text style={{marginBottom: 8}}>{this.props.price}</Text>
    </CardItem>
);

  }
}