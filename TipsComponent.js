import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const tips = [
  {
    title: 'Comece com um fundo de emergência',
    description: 'Antes de investir, tenha um fundo de emergência equivalente a 3-6 meses de despesas.',
    icon: 'shield-alt'
  },
  {
    title: 'Elimine dívidas de alto juros',
    description: 'Priorize o pagamento de dívidas com juros altos, como cartão de crédito.',
    icon: 'credit-card'
  },
  {
    title: 'Invista regularmente',
    description: 'Faça aportes regulares, mesmo que pequenos. A consistência é mais importante que o valor.',
    icon: 'calendar-check'
  },
  {
    title: 'Diversifique seus investimentos',
    description: 'Não coloque todos os ovos na mesma cesta. Diversifique entre diferentes classes de ativos.',
    icon: 'chart-pie'
  },
  {
    title: 'Automatize suas finanças',
    description: 'Configure transferências automáticas para investimentos e pagamentos de contas.',
    icon: 'robot'
  }
];

export default function TipsComponent() {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.mainTitle}>Dicas Financeiras</Title>
      <Paragraph style={styles.subtitle}>
        Pequenas mudanças que podem transformar suas finanças
      </Paragraph>
      
      {tips.map((tip, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <View style={styles.tipHeader}>
              <FontAwesome5 name={tip.icon} size={24} color="#6200ee" />
              <Title style={styles.tipTitle}>{tip.title}</Title>
            </View>
            <Paragraph style={styles.tipDescription}>{tip.description}</Paragraph>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fa',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipTitle: {
    marginLeft: 10,
    fontSize: 18,
  },
  tipDescription: {
    color: '#666',
    lineHeight: 20,
  },
});