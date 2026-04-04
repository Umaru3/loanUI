import React, { useState } from "react";
import { View, Text, Modal, TextInput } from "react-native";
import Button from "../../components/Buttons";
import styles from "./styles";

export default function LoanDetailsScreen({ route, navigation }) {
  const { loan } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState("");

  const handlePay = () => {
    setShowModal(true);
  };

  const confirmPay = () => {
    console.log("User entered:", amount);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Loan Details</Text>
        <Text style={styles.item}>Principal: ₱{loan.principal}</Text>
        <Text style={styles.item}>
          Interest Rate: {(loan.interestRate * 100).toFixed(1)}%
        </Text>
        <Text style={styles.item}>
          Duration: {new Date(loan.startDate).toLocaleDateString()} →{" "}
          {new Date(loan.endDate).toLocaleDateString()}
        </Text>
        {loan.amountRemaining && (
          <Text style={styles.remaining}>
            Remaining Balance: ₱{loan.amountRemaining}
          </Text>
        )}
      </View>

      <View style={styles.buttonRow}>
        <Button title="Pay" onPress={handlePay} />
        <Button title="Go Back" onPress={() => navigation.goBack()} />
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
    </View>
  );
}
