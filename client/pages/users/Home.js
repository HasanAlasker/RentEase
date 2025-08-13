
import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/SafeScreen";
import FullScreen from "../../components/FullScreen";
import Navbar from "../../components/Navbar";
import PostComp from "../../components/PostComp";

function Home(props) {
  return (
    <SafeScreen>
      <FullScreen>
        <PostComp userName={'إكليل'} anualRent={'7344'} contractStart={'1/1/2025'} numberOfPayments={'4'}></PostComp>
        <PostComp userName={'عمر المجالي'} anualRent={'8160'} contractStart={'1/1/2025'} numberOfPayments={'12'}></PostComp>
        
      </FullScreen>
      <Navbar></Navbar>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
