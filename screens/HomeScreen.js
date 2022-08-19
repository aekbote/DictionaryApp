import React, { Component } from 'react';
import {StyleSheet, View, Text,TextInput, TouchableOpacity, } from 'react-native';
import { Header } from 'react-native-elements';



export default class HomeScreen extends Component{

    constructor(){
        super();
        this.state = {
            text: text,
            isSearchPressed: false,
            word : "Loading...",
            lexicalCategory: '',
            examples : [],
            definition : ""
        }
    }
    
    getWord=(word)=>{
        var searchKeyword=word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"

        return fetch(url)
        .then((data)=>{
            if(data.status===200)
            {
                return data.json()
            }
            else
            {
                return null
            }
        })
        .then((response)=>{
            //console.log(response)

            var responseObject = response
            //var word = responseObject.word
            // var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
            if(responseObject){
                var wordData = responseObject.definitions[0]
                //console.log(responseObject.definition[0])
                var definition= wordData.description
                var lexicalCategory = wordData.wordtype
                //console.log(lexicalCategory)
                this.setState({
                "word": this.state.text,
                "definition": definition,
                "lexicalCategory": lexicalCategory
                })
            }else{
               this.setState({
                "word": this.state.text,
                "definition": "Not Found",
               }) 
            }
        })
    }

    render(){
        return( 
        <View>
            <TextInput
              style={styles.inputBox}
              onChangeText={text => {
                 this.setState({
                  text: text,
                 isSearchPressed: false,
                  word : "Loading...",
                 lexicalCategory: '',
                examples : [],
                 definition : ""
          
                    })
               }}   
             /> 

             value={this.state.text} 

         <TouchableOpacity
         style={styles.searchButton}

          onPress={()=> {
               this.setState({ isSearchPressed: true})
             this.getWord(this.state.text)
            }}
         >


         <Text>HomeScreen</Text>
             </TouchableOpacity>

             <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>
                    Word :{""}
                    </Text> 
                    <Text style={{fontSize: 18}}>
                        {this.state.word}
                    </Text>
                </View>

                <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>
                    Type :{""}
                    </Text> 
                    <Text style={{fontSize: 18}}>
                        {this.state.lexicalCategory}
                    </Text>
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                <Text style={styles.detailsTitle}>
                    Word :{" "}
                    </Text> 
                    <Text style={{fontSize: 18}}>
                        {this.state.definition}
                    </Text>
                </View>
   
   
         </View>)
           
    }
        
   
}

const styles= StyleSheet.create({

    detailsContainer:{
        flex: 1
    },
    detailsTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
    },


})