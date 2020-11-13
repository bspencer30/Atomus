import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import Colors from "../../constants/Colors";
import AtomusText from "../../components/Text"
import AtomusCard from "../../components/Card"
import AtomusCard_Child from "../../components/Card_Child"
import { ListItem } from "react-native-elements";

class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
           late_courseWork:[],
           done_courseWork:[],
           upcoming_courseWork:[],
           loading: false,
        };
        this.childInfo = this.props.navigation.getParam("child_info");
        this.Item = this.Item.bind(this);
        // console.log(this.childInfo.courses[0].courseWork.filter(y => (y.assignmentSubmission.late) && (y.assignmentSubmission.state =="new")));        

    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () => <AtomusText fontSize={20} text={"Child"} />,
    });
    
    async componentDidMount() {
        this.setState({loading:true});
        let late_list = [];
        await this.childInfo.courses.filter(x=> 
            late_list.push(x.courseWork.filter(y => (y.assignmentSubmission.late) && (y.assignmentSubmission.state =="new")))
        );
        this.setState({late_courseWork: late_list});
        let done_list = [];
        await this.childInfo.courses.filter(x=> 
            done_list.push(x.courseWork.filter(y => (y.assignmentSubmission.state =="turnedIn")))
        );
        
        this.setState({done_courseWork: done_list});
        console.log(this.state.done_courseWork);
        let upcoming_list = [];
        await this.childInfo.courses.filter(x=> 
            upcoming_list.push(x.courseWork.filter(y => !(y.assignmentSubmission.late) && (y.assignmentSubmission.state =="new")))
        );
       
        this.setState({upcoming_courseWork: upcoming_list});
        this.setState({loading:false});
    }

    renderItem = ({ item }) => (
        <AtomusCard_Child key={item.id} name={item.title} />
    );
    keyExtractor = (item, index) => index.toString()

    Item({ title, index }) {
        console.log("Item=============================\n"+title);
        return(
            <AtomusCard_Child key={index} name={title} />
        );
    }

    render() {
        if (this.state.loading) {
            return (<View style={styles.containerLoading}>
                <ActivityIndicator size="large" color="#8CD4CC" />
            </View>);
        }
        // this.print();
        return(
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <View style={styles.information_container}>
                    <View style={styles.name_container}>
                        <View style={{flex:1, justifyContent:"center"}}>
                            <AtomusText text={this.childInfo.name} style={styles.name} />
                        </View>
                        <View style={{flex:1, justifyContent:"center"}}>
                            <AtomusText text={this.childInfo.email} style={styles.childEmail} />
                        </View>
                    </View>
                    <View style={styles.other_info_container}>
                        <View style={styles.info}>
                            <AtomusText text="School" style={styles.info_label}/>
                            <View style={styles.info_value}>
                                <AtomusText text={this.childInfo.school} style={styles.school_name} />
                            </View>
                        </View>
                        <View style={styles.info}>
                            <AtomusText text="Grade" style={styles.info_label}/>
                            <View style={styles.info_value}>
                                <AtomusText text={this.childInfo.grade} style={styles.school_name} />
                            </View>
                        </View>
                        <View style={styles.info}>
                            <AtomusText text="Age" style={styles.info_label}/>
                            <View style={styles.info_value}>
                                <AtomusText text={this.childInfo.age} style={styles.school_name} />
                            </View>
                        </View>
                        
                    </View>
                </View>
                <View style={styles.list_container}>
                <FlatList
                    keyExtractor={(item) => item.id}
                    data={this.state.late_courseWork}
                    renderItem={({ item, index }) => (
                        <this.Item title={item.title} index={index} />
                    )}
                    extraData={this.state.late_courseWork}
                />
                </View>
            </View>
        </SafeAreaView>);
    }
}

const styles = StyleSheet.create({
    box:{
        flex:1,
        marginTop:50,
    },
    containerLoading: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
        padding: 16,
        alignContent: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        backgroundColor: Colors.beige.opaque,
    },
    information_container:{
        flex:1,
    },
    name_container:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor: "#f1eee7",
    },
    name:{
        fontSize: 38,
        fontFamily: "NunitoSans_Bold",
        paddingHorizontal:10,
        textAlignVertical:"center",
    },
    childEmail: {
        fontSize: 18,
        color: "#4f4f4f",
        textAlignVertical:"center",
        paddingRight:5, 
        textAlign:"right",
    },
    other_info_container:{
        flex:2,
        flexDirection:"row",
        marginTop:10,
        backgroundColor: "#f1eee7",
        justifyContent:"space-evenly",
    },
    info:{
        flex:1,
    },
    info_value:{
        flex:1,
        justifyContent:"center",
    },
    info_label:{
        fontSize: 18,
        color: "#4f4f4f",
        textAlignVertical:"center",
        textAlign:"center",
        textDecorationLine:"underline",
    },
    school_name:{
        fontSize: 15,
        fontFamily: "NunitoSans_Bold",
        paddingHorizontal:10,
        textAlignVertical:"center",
        textAlign:"center",
    },
    list_container: {
        flex:3,
        paddingTop: 50,
        paddingBottom: 50,
    },
    list: {
        paddingTop: 50,
        paddingBottom: 50,
    },
    courseName: {
        textAlign: "center"
    }
});
export default Child;