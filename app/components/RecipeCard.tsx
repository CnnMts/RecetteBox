import { Pressable, Image, Text, StyleSheet, View } from "react-native";
import { Meal } from "@/app/types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/stores";
import { theme } from '../theme';

interface Props {
    recipe: Meal;
    onPress: () => void;
}

export default function RecipeCard({ recipe, onPress }: Props) {
    const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
    const currentTheme = isDarkMode ? theme.dark : theme.light;

    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.card, 
                { 
                    backgroundColor: currentTheme.cardBg,
                    borderColor: currentTheme.border,
                    shadowOpacity: isDarkMode ? 0 : 0.08, 
                }
            ]}
        >
            <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
            
            <View style={styles.textContainer}>
                <Text style={[styles.title, { color: currentTheme.text }]} numberOfLines={1}>
                    {recipe.strMeal}
                </Text>
                <Text style={[styles.category, { color: currentTheme.primary }]}>
                    {recipe.strCategory}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: { 
        marginBottom: 16, 
        borderRadius: 12, 
        overflow: 'hidden',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 3, 
    },
    image: { 
        width: '100%', 
        height: 160 
    },
    textContainer: {
        padding: 12,
    },
    title: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        marginBottom: 4,
    },
    category: { 
        fontSize: 13, 
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});