import { View, StyleSheet, Text, FlatList } from "react-native";
import SafeScreen from "../../components/SafeScreen";
import FullScreen from "../../components/FullScreen";
import Navbar from "../../components/Navbar";
import PostComp from "../../components/PostComp";
import { usePosts } from "../../config/PostsContext";

function Home(props) {
  const { posts } = usePosts();

  const renderPost = ({ item }) => (
    <PostComp
      id={item.id}
      userName={item.userName}
      anualRent={item.anualRent}
      contractStart={item.contractStart}
      numberOfPayments={item.numberOfPayments}
      numberOfCheques={item.numberOfCheques}
      dateOfCheques={item.dateOfCheques}
    />
  );

  return (
    <SafeScreen>
      <FullScreen>
        {posts.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>لا يوجد مستأجرين</Text>
            <Text style={styles.emptySubText}>
              قم بإضافة مستأجر جديد من خلال الضغط على زر الإضافة
            </Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </FullScreen>
      <Navbar />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {},
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
  listContainer: {
    paddingVertical: 10,
  },
});

export default Home;