import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Modal,
  TextInput,
  Alert,
  RefreshControl,
} from "react-native";
import Button from "../../components/Buttons";
import styles from "./styles";
import { payLoan, fetchLoanById } from "../../services/api";

export default function LoanDetailsScreen({ route, navigation }) {
  const { loan } = route.params;
  const [loanData, setLoanData] = useState(loan);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const handlePay = () => setShowModal(true);

  const confirmPay = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid payment amount.");
      setAmount("");
      return;
    }
    try {
      await payLoan(loanData._id, parseFloat(amount));
      const updatedLoan = await fetchLoanById(loanData._id);
      setLoanData(updatedLoan);
    } catch (error) {
      console.error("Error paying loan:", error);
    } finally {
      setAmount("");
      setShowModal(false);
    }
  };

  const handleRefresh = async () => {
    console.log("loans: ", loan)
    setRefreshing(true);
    try {
      const updatedLoan = await fetchLoanById(loanData._id);
      setLoanData(updatedLoan);
    } catch (error) {
      console.error("Error refreshing loan:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.card}>
        <Text style={styles.title}>Loan Details</Text>
        <Text style={styles.item}>Principal: ₱{loanData.principal}</Text>
        <Text style={styles.item}>
          Interest Rate: {(loanData.interestRate * 100).toFixed(1)}%
        </Text>
        <Text style={styles.item}>
          Duration: {new Date(loanData.startDate).toLocaleDateString()} →{" "}
          {new Date(loanData.endDate).toLocaleDateString()}
        </Text>
        {loanData.amountRemaining && (
          <Text style={styles.remaining}>
            Remaining Balance: ₱{loanData.amountRemaining}
          </Text>
        )}
      </View>

      <View style={styles.buttonRow}>
        <Button title="Pay" onPress={handlePay} />
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>

       <View style={styles.buttonRow}>
        <Button 
          size="large" 
          title="Payment History" 
          onPress={() => navigation.navigate("PaymentHistory", { loanId: loan._id })} 
        />
      </View>

      {/* Payment Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Enter Payment Amount</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="₱0.00"
              value={amount}
              onChangeText={setAmount}
            />
            <View style={styles.modalButtons}>
              <Button title="Confirm" onPress={confirmPay} />
              <Button title="Cancel" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
