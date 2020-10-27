import React, { Component } from "react";
import { ActivityIndicator, Alert, StyleSheet, ScrollView, View } from "react-native";
import { ListItem, Icon } from "react-native-elements"
import { Context as AppContext } from "../../context/appContext";

import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusButton from "../../components/Button"

class Student_GuardianList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guardians: [],
            invitations: [],
            loading : false,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Manage Guardians"} />,
        headerRight: () => <Icon name="add" size={30} onPress={() => navigation.navigate("GuardianInvite")} />
    });

    async componentDidMount() {
        this.setState({ loading: true });
        const access_token = this.context.state.credentials.access_token;

        await this.context.getGuardians(access_token);
        await this.context.getGuardianInvitations(access_token);
        let { state } = this.context;
        this.setState({ guardians: state.guardians, invitations: state.invitations, access_token: access_token, loading: false });
    }

    _displayInvitations = () => {
        if (this.state.invitations.length > 0) {
            const invitations = this.state.invitations.map((invite, index) => {
                console.log(invite)
                return (
                    <ListItem key={index} containerStyle={styles.listItem} >
                        <ListItem.Content>
                            <ListItem.Title><AtomusText text={invite.invitedEmailAddress} fontSize={15} style={{ marginLeft: 12 }} /> </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.CheckBox uncheckedIcon={"trash"} onPress={() => this._deleteInvitiation(invite.invitedEmailAddress, invite.invitationId)} />
                    </ListItem>
                )
            });

            return (
                <View>
                    <AtomusText text={"Pending Invitations"} />
                    <ScrollView style={styles.list}>
                        {invitations}
                    </ScrollView>
                    <View style={{ flex: 1000 }} />
                </View>
            );
        }
    }

    _deleteInvitiation = async (invite_email, invite_id) => {
        Alert.alert("Delete Invitation?", `Permanetly delete invitation to ${invite_email}`,[
            {
                text: "Confirm",
                onPress: () => { 
                    this.context.deleteInvitation(this.state.access_token, invite_id);
                    this.componentDidMount();
                }
            },
            {
                text: "Cancel",
            },
        ])

        //await this.context._deleteInvitiation(this.state.access_token, invite_id);
        //this.componentDidMount();
    }

    _displayGuardians = () => {
        if (this.state.guardians.length < 1) {
            return (<AtomusButton style={{ alignItems: "center", marginTop: 50 }} title={"No Guardians, Invite Some"} backgroundColor={Colors.turquoise.opaque} />)
        } else {
            const guardians = this.state.guardians.map((guardian, index) => {
                return (
                    <ListItem key={index} containerStyle={styles.listItem} >
                        <ListItem.Content>
                            <ListItem.Title><AtomusText text={guardian.guardianProfile.name.fullName} fontSize={15} style={{ marginLeft: 12 }} /> </ListItem.Title>
                            <ListItem.Subtitle><AtomusText text={guardian.invitedEmailAddress} fontSize={13} style={{ marginLeft: 12 }} /></ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron color="#cdc2a7" />
                    </ListItem>
                );
            });
            return (
                <View style={{ marginTop: 50 }}>
                    <AtomusText text={"Guardians"} />
                    <ScrollView style={styles.list}>
                        {guardians}
                    </ScrollView>
                    <View style={{ flex: 1000 }} />
                </View>
            );
        }
    }

    render() {
        if (this.state.loading) {
            return(<View style={styles.containerLoading}>
                <ActivityIndicator size="large" color="#8CD4CC" />
            </View>);
        }
        return (
            <View style={styles.container}>
                {this._displayGuardians()}
                <View style={{ flex: 1 }} />
                {this._displayInvitations()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
        padding: 16
    },
    containerLoading: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
        padding: 16, 
        alignContent:"center",
        justifyContent: "center",
    },
    list: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.beige.dark,
    },
    listItem: {
        backgroundColor: Colors.beige.semi_transparent,
    },
});

Student_GuardianList.contextType = AppContext;
export default Student_GuardianList;