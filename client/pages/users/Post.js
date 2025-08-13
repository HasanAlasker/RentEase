import React from 'react';
import { View, StyleSheet } from 'react-native';
import SafeScreen from "../../components/SafeScreen";
import FullScreen from "../../components/FullScreen";
import Navbar from "../../components/Navbar";

function Post(props) {
  return (
    <SafeScreen>
      <FullScreen></FullScreen>
      <Navbar></Navbar>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container:{},
})

export default Post;