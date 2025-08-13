
import { View, StyleSheet } from "react-native";
import SafeScreen from "../../components/SafeScreen";
import FullScreen from "../../components/FullScreen";
import Navbar from "../../components/Navbar";
import PostComp from "../../components/PostComp";

function Home(props) {
  return (
    <SafeScreen>
      <FullScreen>
        <PostComp userName={'شركة المعكرونة'}></PostComp>
      </FullScreen>
      <Navbar></Navbar>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
