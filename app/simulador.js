import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Stack } from 'expo-router';

export default function Simulador() {
  const [valorInicial, setValorInicial] = useState('');
  const [aporteMensal, setAporteMensal] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularInvestimento = () => {
    const principal = parseFloat(valorInicial) || 0;
    const aporte = parseFloat(aporteMensal) || 0;
    const taxa = parseFloat(taxaJuros) / 100;
    const meses = parseInt(periodo) || 0;
    
    let montante = principal;
    let totalInvestido = principal;
    let totalJuros = 0;
    
    for (let i = 0; i < meses; i++) {
      montante = montante * (1 + taxa) + aporte;
      totalInvestido += aporte;
    }
    
    totalJuros = montante - totalInvestido;
    
    setResultado({
      montanteFinal: montante.toFixed(2),
      totalInvestido: totalInvestido.toFixed(2),
      totalJuros: totalJuros.toFixed(2)
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Simulador de Investimentos' }} />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Valor Inicial (R$)</Text>
            <TextInput
              style={styles.input}
              value={valorInicial}
              onChangeText={setValorInicial}
              placeholder="Ex: 1000"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Aporte Mensal (R$)</Text>
            <TextInput
              style={styles.input}
              value={aporteMensal}
              onChangeText={setAporteMensal}
              placeholder="Ex: 200"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Taxa de Juros Mensal (%)</Text>
            <TextInput
              style={styles.input}
              value={taxaJuros}
              onChangeText={setTaxaJuros}
              placeholder="Ex: 0.5"
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Período (meses)</Text>
            <TextInput
              style={styles.input}
              value={periodo}
              onChangeText={setPeriodo}
              placeholder="Ex: 120"
              keyboardType="numeric"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={calcularInvestimento}
          >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
          
          {resultado && (
            <View style={styles.resultadoContainer}>
              <Text style={styles.resultadoTitle}>Resultado da Simulação</Text>
              
              <View style={styles.resultadoItem}>
                <Text style={styles.resultadoLabel}>Montante Final:</Text>
                <Text style={styles.resultadoValue}>R$ {resultado.montanteFinal}</Text>
              </View>
              
              <View style={styles.resultadoItem}>
                <Text style={styles.resultadoLabel}>Total Investido:</Text>
                <Text style={styles.resultadoValue}>R$ {resultado.totalInvestido}</Text>
              </View>
              
              <View style={styles.resultadoItem}>
                <Text style={styles.resultadoLabel}>Juros Acumulados:</Text>
                <Text style={styles.resultadoValue}>R$ {resultado.totalJuros}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2c3e50',
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultadoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  resultadoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultadoLabel: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  resultadoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});