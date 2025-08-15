import { View, StyleSheet, Text, FlatList } from "react-native";
import SafeScreen from "../../components/SafeScreen";
import FullScreen from "../../components/FullScreen";
import Navbar from "../../components/Navbar";
import PostComp from "../../components/PostComp";
import { usePosts } from "../../config/PostsContext";

function Home(props) {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return (
      <SafeScreen>
        <FullScreen>
          <View style={styles.loadingContainer}>
            <Text>جاري التحميل...</Text>
          </View>
        </FullScreen>
        <Navbar />
      </SafeScreen>
    );
  }

  const renderPost = ({ item }) => (
    <PostComp
      id={item.id}
      userName={item.userName}
      anualRent={item.anualRent}
      contractStart={item.contractStart}
      numberOfPayments={item.numberOfPayments}
      numberOfCheques={item.numberOfCheques}
      dateOfCheques={item.dateOfCheques}
      payments={item.payments}
      notes={item.notes}
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 18,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
  listContainer: {
    paddingVertical: 10,
  },
});

export default Home;