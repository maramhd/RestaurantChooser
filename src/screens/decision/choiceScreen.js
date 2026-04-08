import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomButton from "../../components/CustomButton";

const ChoiceScreen = ({ route, navigation }) => {
  const { participants: initialParticipants, restaurants: initialRestaurants } =
    route.params;

  const [participants, setParticipants] = useState(initialParticipants);
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [selectedVisible, setSelectedVisible] = useState(false);
  const [vetoVisible, setVetoVisible] = useState(false);
  const [chosenRestaurant, setChosenRestaurant] = useState(null);

  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const selectRandomRestaurant = () => {
    if (!restaurants || restaurants.length === 0) {
      Alert.alert(
        "No restaurants left",
        "Please go back and adjust filters or add more restaurants.",
      );
      return;
    }
    const randomIndex = getRandom(0, restaurants.length - 1);
    setChosenRestaurant(restaurants[randomIndex]);
    setSelectedVisible(true);
  };

  const handleAccept = () => {
    setSelectedVisible(false);
    navigation.navigate("PostChoiceScreen", { chosenRestaurant });
  };

  const handleVetoPress = () => {
    setSelectedVisible(false);
    setVetoVisible(true);
  };

  const handleVetoBy = (person) => {
    // تحديث حالة الفيتو لهذا الشخص
    const updatedParticipants = participants.map((p) =>
      p.key === person.key ? { ...p, vetoed: "yes" } : p,
    );
    setParticipants(updatedParticipants);

    // إزالة المطعم المختار من القائمة
    const updatedRestaurants = restaurants.filter(
      (r) => r.key !== chosenRestaurant.key,
    );
    setRestaurants(updatedRestaurants);

    setVetoVisible(false);

    // التحقق إذا كان لا يزال هناك أشخاص يمكنهم الفيتو
    const stillCanVeto = updatedParticipants.some((p) => p.vetoed === "no");

    if (updatedRestaurants.length === 0) {
      Alert.alert(
        "No restaurants left",
        "All restaurants have been vetoed. Please start over.",
      );
      navigation.popToTop(); // العودة إلى DecisionTimeScreen
    } else if (!stillCanVeto) {
      Alert.alert(
        "No vetoes left",
        "Everyone has used their veto. You must accept the next restaurant.",
      );
      // إعادة فتح الاختيار العشوائي بدون خيار الفيتو
      setSelectedVisible(false);
      selectRandomRestaurant();
    } else {
      // اختيار مطعم جديد تلقائياً
      selectRandomRestaurant();
    }
  };

  const vetoDisabled = participants.every((p) => p.vetoed === "yes");

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.choiceScreenListContainer}
        data={participants.filter((x) => !!x)}
        keyExtractor={(item) => item?.key || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.choiceScreenListItem}>
            <Text style={styles.choiceScreenListItemName}>
              {item.firstName} {item.lastName} ({item.relationship})
            </Text>
            <Text>Vetoed: {item.vetoed || "no"}</Text>
          </View>
        )}
      />
      <CustomButton
        text="Randomly Choose"
        width="94%"
        onPress={selectRandomRestaurant}
      />

      {/* Modal عرض المطعم المختار */}
      <Modal
        visible={selectedVisible}
        animationType="slide"
        transparent={false}
      >
        {chosenRestaurant ? (
          <View style={styles.selectedContainer}>
            <View style={styles.selectedInnerContainer}>
              <Text style={styles.selectedName}>{chosenRestaurant.name}</Text>
              <View style={styles.selectedDetails}>
                <Text style={styles.selectedDetailsLine}>
                  This is a {"★".repeat(chosenRestaurant.rating || 0)} star
                </Text>
                <Text style={styles.selectedDetailsLine}>
                  {chosenRestaurant.cuisine} restaurant
                </Text>
                <Text style={styles.selectedDetailsLine}>
                  with a price rating of{" "}
                  {"$".repeat(chosenRestaurant.price || 0)}
                </Text>
                <Text style={styles.selectedDetailsLine}>
                  that {chosenRestaurant.delivery ? "DOES" : "DOES NOT"} deliver
                </Text>
              </View>
              <CustomButton text="Accept" width="94%" onPress={handleAccept} />
              <CustomButton
                text="Veto"
                width="94%"
                onPress={handleVetoPress}
                disabled={vetoDisabled}
              />
            </View>
          </View>
        ) : (
          <View style={styles.selectedContainer}>
            <Text>No restaurant selected.</Text>
          </View>
        )}
      </Modal>

      {/* Modal اختيار من يقوم بالفيتو */}
      <Modal visible={vetoVisible} animationType="slide" transparent={false}>
        <View style={styles.vetoContainer}>
          <View style={styles.vetoContainerInner}>
            <Text style={styles.vetoHeadline}>Who is vetoing?</Text>
            <ScrollView style={styles.vetoScrollViewContainer}>
              {participants
                .filter((p) => p.vetoed === "no")
                .map((p) => (
                  <TouchableOpacity
                    key={p.key}
                    style={styles.vetoParticipantContainer}
                    onPress={() => handleVetoBy(p)}
                  >
                    <Text style={styles.vetoParticipantName}>
                      {p.firstName} {p.lastName}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.vetoButtonContainer}>
              <CustomButton
                text="Never Mind"
                width="94%"
                onPress={() => {
                  setVetoVisible(false);
                  setSelectedVisible(true);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  choiceScreenListContainer: {
    width: "94%",
  },
  choiceScreenListItem: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4,
    borderBottomWidth: 2,
    borderColor: "#e0e0e0",
    alignItems: "center",
  },
  choiceScreenListItemName: {
    flex: 1,
  },
  selectedContainer: {
    flex: 1,
    justifyContent: "center",
  },
  selectedInnerContainer: {
    alignItems: "center",
  },
  selectedName: {
    fontSize: 32,
  },
  selectedDetails: {
    paddingTop: 80,
    paddingBottom: 80,
    alignItems: "center",
  },
  selectedDetailsLine: {
    fontSize: 18,
  },
  vetoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  vetoContainerInner: {
    justifyContent: "center",
    alignItems: "center",
  },
  vetoHeadline: {
    fontSize: 32,
    fontWeight: "bold",
  },
  vetoScrollViewContainer: {
    height: "50%",
  },
  vetoParticipantContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  vetoParticipantName: {
    fontSize: 24,
  },
  vetoButtonContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
  },
};

export default ChoiceScreen;
