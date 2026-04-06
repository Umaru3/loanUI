import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import styles from "./styles";
import Button from "../../components/Buttons";
import { AuthContext } from "../../context/AuthContext";
import { fetchLoanByUserId } from "../../services/api";

export default function HomeScreen({ navigation }) {
  const { authData, setAuthData } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const loadLoans = async () => {
    try {
      const loans = await fetchLoanByUserId(authData.userId);
      setAuthData({ ...authData, loans });
    } catch (err) {
      console.error("Error fetching loans:", err);
    }
  };

  useEffect(() => {
    if (authData.userId) loadLoans();
  }, [authData.userId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadLoans();
    setRefreshing(false);
  };
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
            <TouchableOpacity
              style={styles.loanCard}
              onPress={() => navigation.navigate("LoanDetails", { loan: item })}
            >
              <Text style={styles.loanTitle}>Loan #{item._id.slice(-4)}</Text>
              <Text>Principal: ₱{item.principal}</Text>
              <Text>Interest Rate: {(item.interestRate * 100).toFixed(1)}%</Text>
              {item.amountRemaining && (
                <Text style={styles.remaining}>
                  Remaining Balance: ₱{item.amountRemaining}
                </Text>
              )}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No loans available</Text>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </View>
  );
}
