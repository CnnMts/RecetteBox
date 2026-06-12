import { useSelector } from "react-redux";
import { RootState } from "@/app/stores";
import { FlatList, Text, View, StyleSheet } from "react-native";
import RecipeCard from "../components/RecipeCard";
import { useNavigation } from "@react-navigation/native";
import { theme } from '../theme';

export default function FavoritesScreen() {
    const navigation = useNavigation<any>();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode)
    const currentTheme = isDarkMode ? theme.dark : theme.light;

    if (favorites.length === 0) {
        return (
            <View style={[styles.emptyContainer, { backgroundColor: currentTheme.background }]}>
                <Text style={[styles.emptyText, { color: currentTheme.textMuted }]}>
                    Aucun favori pour l'instant 
                </Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
            <FlatList
                style={styles.list}
                data={favorites}
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    list: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 12,
    }
});