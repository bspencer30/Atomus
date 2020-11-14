import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { Card, Icon, Avatar, Badge, withBadge} from "react-native-elements";

import Colors from "../constants/Colors";
import AtomusText from "./Text";

export default class AtomusCard_Child extends Component {
    constructor(props) {
        super(props);
    }

    onPress = () => {
        this.props.onPress(this.props.child_key);
    };

     render() {
        return (
            <TouchableOpacity onPress={this.onPress} style={styles.opacityContainer} >
                <Card containerStyle={[styles.container]} wrapperStyle={styles.wrapperContainer}>
                   
                        <View style={styles.childInformation}> 
                            <AtomusText text={this.props.name} style={styles.titleText} />
                            <AtomusText text={this.props.email} style={styles.childEmail} />
                        </View>
                        <View style={styles.status}>
                            <View style={styles.badgeContainer}>
                                <AtomusText text="late" style={styles.badgeLabel} />
                                {/* "#F87060" */}
                                <Badge value={this.props.late} status="error" size="large" badgeStyle={[styles.badge, {backgroundColor:Colors.soft_pink.opaque}]} textStyle={styles.badgeText}/>
                            </View>
                            <View style={styles.badgeContainer}>
                                <AtomusText text="done" style={styles.badgeLabel} />
                                {/* "#44af69" */}
                                <Badge value={this.props.done} status="success" badgeStyle={[styles.badge, {backgroundColor: Colors.turquoise.opaque}]} textStyle={styles.badgeText}/>
                            </View>
                            <View style={styles.badgeContainer}>
                                <AtomusText text="upcoming" style={styles.badgeLabel} />
                                {/* "#44af69" */}
                                <Badge value={this.props.upcoming} status="primary" badgeStyle={[styles.badge, {backgroundColor:Colors.yellow.opaque}]} textStyle={styles.badgeText}/>
                            </View>
                        </View>
                    
                </Card>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    badgeContainer:{
        flex:1,
        flexDirection:"row",
        height:"100%",
        flexDirection:"column",
        justifyContent:"space-evenly",
    },
    badge:{
        flex:3,
        flexGrow:1,
        fontSize:20,
        width:"90%",
    },
    badgeText:{
        fontSize:15,
    },
    badgeLabel:{
        fontSize: 14,
        color: "#4f4f4f",
        textAlign: "center",
    },
    opacityContainer:{
        flex: 1,
        flexDirection:"row",
    },
    wrapperContainer:{
        flex:1, 
        flexDirection:"row",
    },
    container: {
        borderRadius: 5,
        backgroundColor: "#f1eee7",
        shadowRadius: 3,
        borderWidth: 2,
        flex:1, 
        flexDirection:"row",
        //shadowColor: Colors.turquoise.semi_transparent,
        //borderColor: Colors.turquoise.semi_transparent
    },
    childInformation:{
        flex:2,
        flexDirection:"column",
    },
    titleText: {
        fontSize: 18,
        textAlign: "left",
        marginBottom: 0,
        fontFamily: "NunitoSans_Bold",
        
    },
    childEmail: {
        fontSize: 14,
        color: "#4f4f4f",
    },
    status:{
        flex:3,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
})
AtomusCard_Child.propTypes = {
    email: PropTypes.string,
    name: PropTypes.string,
    onPress: PropTypes.func,
}

AtomusCard_Child.defaultProps = {
    email: "example@mail.com",
    name: "Griffin",
    onPress: () => { console.log("Card Pressed"); },
}