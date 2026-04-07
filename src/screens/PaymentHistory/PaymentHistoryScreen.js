import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, RefreshControl } from "react-native";
import styles from "./styles";
import Button from "../../components/Buttons";
import { fetchLoanById } from "../../services/api";

export default function PaymentHistoryScreen({ route, navigation }) {
    const { loanId } = route.params;
    const [loanData, setLoanData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadLoan = async () => {
        try {
            const updatedLoan = await fetchLoanById(loanId);
            setLoanData(updatedLoan);
        } catch (err) {
            console.error("Error fetching loan:", err);
        }
    };

    useEffect(() => {
        loadLoan();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadLoan();
        setRefreshing(false);
    };

    if (!loanData) return <Text>Loading...</Text>;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        >
            <View style={styles.card}>
            <Text style={styles.title}>Payment History</Text>
            {loanData.loanPaymentList?.length > 0 ? (
                loanData.loanPaymentList.map((p, idx) => (
                <Text key={idx} style={styles.item}>
                    {new Date(p.date).toLocaleDateString()} — Paid ₱{p.amountPaid} → Remaining ₱{p.amountRemaining}
                </Text>
                ))
            ) : (
                <Text style={styles.item}>No payments yet</Text>
            )}
            </View>

        <View style={styles.buttonRow}>
            <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>

        </ScrollView>
    );
}
