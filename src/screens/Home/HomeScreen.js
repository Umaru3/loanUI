import React, { useContext, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./styles";
import Button from "../../components/Buttons";
import { AuthContext } from "../../context/AuthContext";
import { fetchUserLoans } from "../../services/api";

export default function HomeScreen({ navigation }) {
  const { authData, setAuthData } = useContext(AuthContext);

  useEffect(() => {
    const loadLoans = async () => {
      try {
        const loans = await fetchUserLoans(authData.userId);
        setAuthData({ ...authData, loans });
      } catch (err) {
        console.error("Error fetching loans:", err);
      }
    };
    if (authData.userId) loadLoans();
  }, [authData.userId]);

  const handleLogout = () => {
    setAuthData({ token: null, username: null, userId: null, loans: [] });
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" size="logout" onPress={handleLogout} />
      <Text style={styles.title}>Welcome, {authData.username}!</Text>

      <View style={styles.homeContainer}>
        <FlatList
          data={authData.loans || []}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.loanCard}>
              <Text style={styles.loanTitle}>Loan #{item._id.slice(-4)}</Text>
              <Text>Principal: ₱{item.principal}</Text>
              <Text>Interest Rate: {(item.interestRate * 100).toFixed(1)}%</Text>
              <Text>
                Duration: {new Date(item.startDate).toLocaleDateString()} →{" "}
                {new Date(item.endDate).toLocaleDateString()}
              </Text>
              {item.amountRemaining && (
                <Text style={styles.remaining}>
                  Remaining Balance: ₱{item.amountRemaining}
                </Text>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No loans available</Text>
          }
        />
      </View>
    </View>
  );
}
