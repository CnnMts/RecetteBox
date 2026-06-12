import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores';
import { fetchRecipes } from '../stores/recipeSlice';
import RecipeCard from '../components/RecipeCard';
import { theme } from '../theme'; 

export default function HomeScreen() {
    const [query, setQuery] = useState('');
    const navigation = useNavigation<any>();
    const dispatch = useDispatch<AppDispatch>();

    
    
  
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)

    const { results, loading, error } = useSelector((state: RootState) => state.recipes);
    
    useEffect(() => {
        dispatch(fetchRecipes(query));
    }, [query, dispatch]);
  
    const currentTheme = isDarkMode ? theme.dark : theme.light;

    return (
        <View style={[styles.mainContainer, { backgroundColor: currentTheme.background }]}>
            <TextInput
                style={[
                    styles.searchBar, 
                    { 
                        backgroundColor: currentTheme.inputBg, 
                        borderColor: currentTheme.border, 
                        color: currentTheme.text 
                    }
                ]}
                onChangeText={setQuery}
                value={query}
                placeholder="Search Meal..."
                placeholderTextColor={currentTheme.textMuted}
            />
            {loading && results.length === 0 && (
                <ActivityIndicator size="large" color={currentTheme.primary} style={{ marginTop: 20 }} />
            )}
            {error && <Text style={[styles.errorText, { color: currentTheme.primary }]}>{error}</Text>}
            
            <FlatList
                style={styles.container}
                data={results}
                keyExtractor={item => item.idMeal}
                renderItem={({ item }) => (
                    <RecipeCard
                        recipe={item}
                        onPress={() => navigation.navigate('Detail', { idMeal: item.idMeal })}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 12,
    },
    searchBar: {
        padding: 14,
        margin: 12,
        borderRadius: 8,
        borderWidth: 1,
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '600',
    }
});