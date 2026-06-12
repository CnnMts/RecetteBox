import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { MealDetail } from "@/app/types";
import { getMealById } from "@/app/services/apiService";
import { Image, Pressable, ScrollView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "@/app/stores/favoritesSlice";
import { RootState } from "@/app/stores";
import { theme } from '../theme';

export default function DetailScreen() {
    const route = useRoute<any>();
    const { idMeal } = route.params;
    const [meal, setMeal] = useState<MealDetail | null>(null);

    const dispatch = useDispatch();
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const currentTheme = isDarkMode ? theme.dark : theme.light;

    const isFavorite = useSelector((state: RootState) =>
        (state.favorites?.favorites ?? []).some(f => f.idMeal === idMeal)
    );

    useEffect(() => {
        async function fetchMeal() {
            const data = await getMealById(idMeal);
            setMeal(data);
        }
        fetchMeal();
    }, [idMeal]);

    if (!meal) {
        return (
            <View style={[styles.loaderContainer, { backgroundColor: currentTheme.background }]}>
                <ActivityIndicator size="large" color={currentTheme.primary} />
                <Text style={{ color: currentTheme.textMuted, marginTop: 10 }}>Chargement...</Text>
            </View>
        );
    }

    function toggleFavorite() {
        if (!meal) return;
        if (isFavorite) {
            dispatch(removeFavorite(meal.idMeal));
        } else {
            dispatch(addFavorite(meal));
        }
    }

    return (
        <ScrollView style={{ backgroundColor: currentTheme.background }}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            
            {/* Ajout de la couleur dynamique ici pour bloquer l'image sous les arrondis */}
            <View style={[styles.contentContainer, { backgroundColor: currentTheme.background }]}>
                <Text style={[styles.title, { color: currentTheme.text }]}>{meal.strMeal}</Text>
                
                <View style={[styles.badge, { backgroundColor: currentTheme.cardBg }]}>
                    <Text style={[styles.badgeText, { color: currentTheme.primary }]}>
                        {meal.strCategory.toUpperCase()}
                    </Text>
                </View>

                <Text style={[styles.sectionTitle, { color: currentTheme.text }]}>Instructions</Text>
                <Text style={[styles.instructions, { color: currentTheme.textMuted }]}>
                    {meal.strInstructions}
                </Text>

                <Pressable
                    style={[
                        styles.buttonAddFavorite,
                        { backgroundColor: isFavorite ? currentTheme.secondary : currentTheme.primary }
                    ]}
                    onPress={toggleFavorite}
                >
                    <Text style={styles.buttonText}>
                        {isFavorite ? 'Retirer des favoris' : ' Ajouter aux favoris'}
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
    },
    contentContainer: {
        padding: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 20,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    instructions: {
        fontSize: 15,
        lineHeight: 24,
        marginBottom: 30,
        textAlign: 'justify'
    },
    buttonAddFavorite: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 4,
        marginBottom: 30,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
});