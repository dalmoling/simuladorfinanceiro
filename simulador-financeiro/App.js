import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PieChart } from 'react-native-chart-kit';
import { FontAwesome5, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, Button, Divider, ProgressBar, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f5f7fa',
  },
};

const { width } = Dimensions.get('window');

export default function App() {
  const [rendaMensal, setRendaMensal] = useState('');
  const [estrategiaResultado, setEstrategiaResultado] = useState(null);
  
  const scrollViewRef = useRef(null);
  
  const calcularEstrategia = () => {
    const renda = parseFloat(rendaMensal);
    
    if (isNaN(renda)) {
      alert('Por favor, informe sua renda mensal');
      return;
    }
    
    const necessidades = renda * 0.5;
    const desejos = renda * 0.3;
    const investimentos = renda * 0.2;
    
    setEstrategiaResultado({
      necessidades: necessidades.toFixed(2),
      desejos: desejos.toFixed(2),
      investimentos: investimentos.toFixed(2)
    });
    
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        
        <View style={styles.header}>
          <MaterialCommunityIcons name="finance" size={28} color="#6200ee" style={styles.headerIcon} />
          <Text style={styles.title}>Estratégia 50/30/20</Text>
          <FontAwesome5 name="coins" size={20} color="#FFC107" />
        </View>
        
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Card style={styles.card}>
            <Card.Title 
              title="Organize suas finanças" 
              left={(props) => <FontAwesome5 name="balance-scale" size={24} color="#6200ee" />} 
            />
            <Card.Content>
              <View style={styles.introContainer}>
                <MaterialCommunityIcons name="information-outline" size={20} color="#2196F3" style={styles.infoIcon} />
                <Text style={styles.estrategiaDesc}>
                  A estratégia 50/30/20 é uma forma simples de organizar seu orçamento mensal:
                </Text>
              </View>
              
              <View style={styles.categoriasContainer}>
                <View style={styles.categoriaRow}>
                  <View style={[styles.iconCircle, {backgroundColor: '#E8F5E9'}]}>
                    <FontAwesome5 name="home" size={16} color="#4CAF50" />
                  </View>
                  <View style={styles.categoriaTexto}>
                    <Text style={[styles.categoriaTitle, {color: '#4CAF50'}]}>50% Necessidades</Text>
                    <Text style={styles.categoriaDesc}>Aluguel, contas, alimentação</Text>
                  </View>
                </View>
                
                <View style={styles.categoriaRow}>
                  <View style={[styles.iconCircle, {backgroundColor: '#E3F2FD'}]}>
                    <FontAwesome5 name="shopping-bag" size={16} color="#2196F3" />
                  </View>
                  <View style={styles.categoriaTexto}>
                    <Text style={[styles.categoriaTitle, {color: '#2196F3'}]}>30% Desejos</Text>
                    <Text style={styles.categoriaDesc}>Lazer, viagens, compras</Text>
                  </View>
                </View>
                
                <View style={styles.categoriaRow}>
                  <View style={[styles.iconCircle, {backgroundColor: '#F3E5F5'}]}>
                    <FontAwesome5 name="piggy-bank" size={16} color="#9C27B0" />
                  </View>
                  <View style={styles.categoriaTexto}>
                    <Text style={[styles.categoriaTitle, {color: '#9C27B0'}]}>20% Investimentos</Text>
                    <Text style={styles.categoriaDesc}>Poupança, aposentadoria</Text>
                  </View>
                </View>
              </View>
              
              <Divider style={styles.divider} />
              
              <View style={styles.calculadoraContainer}>
                <View style={styles.calculadoraHeader}>
                  <Ionicons name="calculator" size={20} color="#6200ee" />
                  <Text style={styles.calculadoraTitle}>Calculadora</Text>
                </View>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    <MaterialIcons name="monetization-on" size={16} color="#4CAF50" /> Sua Renda Mensal (R$)
                  </Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={rendaMensal}
                    onChangeText={setRendaMensal}
                    placeholder="Ex: 3000"
                  />
                </View>
                
                <Button 
                  mode="contained" 
                  onPress={calcularEstrategia}
                  style={styles.button}
                  icon={({size, color}) => (
                    <FontAwesome5 name="calculator" size={size-2} color={color} />
                  )}
                >
                  Calcular Distribuição
                </Button>
              </View>
              
              {estrategiaResultado && (
                <View style={styles.resultadoContainer}>
                  <View style={styles.resultadoHeader}>
                    <MaterialCommunityIcons name="chart-pie" size={24} color="#6200ee" />
                    <Text style={styles.resultadoTitle}>Sua Distribuição Mensal</Text>
                  </View>
                  <Divider style={styles.divider} />
                  
                  <View style={styles.categoriaContainer}>
                    <View style={styles.categoriaHeader}>
                      <View style={[styles.iconCircle, {backgroundColor: '#E8F5E9'}]}>
                        <FontAwesome5 name="home" size={16} color="#4CAF50" />
                      </View>
                      <Text style={[styles.categoriaLabel, {color: '#4CAF50'}]}>Necessidades (50%)</Text>
                    </View>
                    <ProgressBar progress={0.5} color="#4CAF50" style={styles.progressBar} />
                    <Text style={[styles.valorCategoria, {color: '#4CAF50'}]}>R$ {estrategiaResultado.necessidades}</Text>
                  </View>
                  
                  <View style={styles.categoriaContainer}>
                    <View style={styles.categoriaHeader}>
                      <View style={[styles.iconCircle, {backgroundColor: '#E3F2FD'}]}>
                        <FontAwesome5 name="shopping-bag" size={16} color="#2196F3" />
                      </View>
                      <Text style={[styles.categoriaLabel, {color: '#2196F3'}]}>Desejos (30%)</Text>
                    </View>
                    <ProgressBar progress={0.3} color="#2196F3" style={styles.progressBar} />
                    <Text style={[styles.valorCategoria, {color: '#2196F3'}]}>R$ {estrategiaResultado.desejos}</Text>
                  </View>
                  
                  <View style={styles.categoriaContainer}>
                    <View style={styles.categoriaHeader}>
                      <View style={[styles.iconCircle, {backgroundColor: '#F3E5F5'}]}>
                        <FontAwesome5 name="piggy-bank" size={16} color="#9C27B0" />
                      </View>
                      <Text style={[styles.categoriaLabel, {color: '#9C27B0'}]}>Investimentos (20%)</Text>
                    </View>
                    <ProgressBar progress={0.2} color="#9C27B0" style={styles.progressBar} />
                    <Text style={[styles.valorCategoria, {color: '#9C27B0'}]}>R$ {estrategiaResultado.investimentos}</Text>
                  </View>
                  
                  <View style={styles.chartContainer}>
                    <PieChart
                      data={[
                        {
                          name: 'Necessidades',
                          population: 50,
                          color: '#4CAF50',
                          legendFontColor: '#7F7F7F',
                          legendFontSize: 12,
                        },
                        {
                          name: 'Desejos',
                          population: 30,
                          color: '#2196F3',
                          legendFontColor: '#7F7F7F',
                          legendFontSize: 12,
                        },
                        {
                          name: 'Investimentos',
                          population: 20,
                          color: '#9C27B0',
                          legendFontColor: '#7F7F7F',
                          legendFontSize: 12,
                        },
                      ]}
                      width={width - 80}
                      height={180}
                      chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      }}
                      accessor="population"
                      backgroundColor="transparent"
                      paddingLeft="15"
                      absolute
                    />
                  </View>
                  
                  <View style={styles.dicas}>
                    <View style={styles.dicasHeader}>
                      <FontAwesome5 name="lightbulb" size={18} color="#FFC107" />
                      <Text style={styles.dicasTitle}>Dicas Financeiras</Text>
                    </View>
                    <View style={styles.dicaItem}>
                      <MaterialIcons name="check-circle" size={14} color="#4CAF50" />
                      <Text style={styles.dicasText}>
                        Acompanhe seus gastos por 30 dias para identificar onde seu dinheiro está indo.
                      </Text>
                    </View>
                    <View style={styles.dicaItem}>
                      <MaterialIcons name="check-circle" size={14} color="#4CAF50" />
                      <Text style={styles.dicasText}>
                        Priorize pagar dívidas com juros altos antes de aumentar investimentos.
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45,
    paddingBottom: 15,
    backgroundColor: '#fff',
    elevation: 4,
  },
  headerIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  card: {
    margin: 12,
    elevation: 4,
    borderRadius: 12,
  },
  introContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  estrategiaDesc: {
    fontSize: 13,
    color: '#555',
    flex: 1,
    lineHeight: 18,
  },
  categoriasContainer: {
    marginVertical: 8,
  },
  categoriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  categoriaTexto: {
    flex: 1,
  },
  categoriaTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoriaDesc: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    marginVertical: 12,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  calculadoraContainer: {
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  calculadoraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  calculadoraTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  resultadoContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  resultadoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  resultadoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  categoriaContainer: {
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 8,
  },
  categoriaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoriaLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 6,
  },
  valorCategoria: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 12,
    backgroundColor: '#FAFAFA',
    padding: 12,
    borderRadius: 8,
  },
  dicas: {
    backgroundColor: '#FFF8E1',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  dicasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dicasTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  dicaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  dicasText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 6,
    flex: 1,
  },
});
