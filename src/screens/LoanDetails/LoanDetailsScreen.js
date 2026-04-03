import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Buttons";
import styles from "./styles";

export default function LoanDetailsScreen({ route, navigation }) {
  const { loan } = route.params;

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
        <Button
          title="Pay"
          onPress={() => console.log("Paid")}
        />
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}
