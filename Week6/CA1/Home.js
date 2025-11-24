import React from 'react';
import { StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { datasource } from './Data.js';

const Home = ({ navigation }) => {
  const renderItem = ({ item, index, section }) => {
    return (
      <TouchableOpacity
        style={styles.opacityStyle}
        onPress={() => {
          navigation.navigate("Edit", {
            index: index,
            type: section.title,
            statement: item.type,
            amount: item.amount
          });
        }}
      >
        <Text style={styles.textStyle}>
          {item.type}: ${item.amount}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.centerContent}>
        <SectionList
          sections={datasource}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
          renderSectionHeader={({ section: { title, bgcolor } }) => (
            <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
              {title}
            </Text>
          )}
        />

        <View style={styles.buttonWrapper}>
          <Button
            title='Add New Income/Expenses'
            onPress={() => navigation.navigate("Add")}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title='Total Income Expenses'
            onPress={() => {
              const incomeTotal = datasource[0].data.reduce((sum, item) => sum + item.amount, 0);
              const expenseTotal = datasource[1].data.reduce((sum, item) => sum + item.amount, 0);

              const difference = Math.abs(incomeTotal - expenseTotal).toFixed(2);
              const status = incomeTotal >= expenseTotal ? 'Surplus' : 'Deficit';

              Alert.alert(
                'Financial Summary',
                `Total Income: $${incomeTotal.toFixed(2)}\nTotal Expense: $${expenseTotal.toFixed(2)}\nYou have a ${status} of $${difference}`,
                [{ text: 'OK' }]
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#D8CFEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    width: '100%',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
  },
  textStyle: {
    fontSize: 15,
    margin: 10,
    textAlign: 'left',
  },
  opacityStyle: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    width: '100%',
    marginVertical: 5,
  },
});

export default Home;
