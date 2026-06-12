// ============================================================
// RecetteBox — TODO général
// Suis les étapes dans l'ordre, l'app doit tourner à chaque fin de partie.
// ============================================================

// ────────────────────────────────────────────────────────────
// PARTIE 1 — Fondations & interface
// ────────────────────────────────────────────────────────────

// TODO [1.1] App.tsx
//   - Vérifier que l'app de base s'affiche (checkpoint Expo Go)
//   - Envelopper plus tard dans <Provider> et <PersistGate> (fait en partie 4/5)

// TODO [1.2] Créer le dossier /components
//   - Créer components/RecipeCard.tsx
//   - Afficher : image de la recette, nom, catégorie
//   - Accepter une prop `recipe` (type à créer dans /types)
//   - Ajouter un TouchableOpacity pour rendre la carte cliquable (navigation en partie 2)

// TODO [1.3] Créer /types/index.ts
//   - Définir l'interface `Meal` (idMeal, strMeal, strCategory, strMealThumb, etc.)
//   - Définir l'interface `MealDetail` (étend Meal avec strInstructions, ingrédients, etc.)

// TODO [1.4] Créer screens/HomeScreen.tsx
//   - Ajouter un champ de recherche (TextInput)
//   - Afficher une FlatList avec des données FACTICES pour l'instant (tableau en dur)
//   - Utiliser RecipeCard dans le renderItem
//   - Ajouter keyExtractor={item => item.idMeal}
//   - Gérer les états : loading | erreur | liste vide (afficher un texte pour chaque)

// ────────────────────────────────────────────────────────────
// PARTIE 2 — Navigation & détail
// ────────────────────────────────────────────────────────────

// TODO [2.1] Créer navigation/AppNavigator.tsx
//   - Installer : @react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs
//   - Créer HomeStack  : HomeScreen → DetailScreen (passer idMeal en params)
//   - Créer FavStack   : FavoritesScreen → DetailScreen
//   - Créer Tab.Navigator avec les deux stacks (headerShown: false sur les Tab.Screen)
//   - Envelopper le tout dans <NavigationContainer>

// TODO [2.2] Créer /types/navigation.ts
//   - Définir RootTabParamList  (HomeTab, FavTab)
//   - Définir HomeStackParamList  (Home: undefined, Detail: { idMeal: string })
//   - Définir FavStackParamList   (Favorites: undefined, Detail: { idMeal: string })
//   - Typer useNavigation et route avec ces types

// TODO [2.3] Créer screens/DetailScreen.tsx
//   - Récupérer idMeal depuis route.params
//   - Afficher pour l'instant juste l'idMeal reçu (données API en partie 3)
//   - Prévoir la place pour : image, nom, instructions, liste ingrédients

// TODO [2.4] Mettre à jour components/RecipeCard.tsx
//   - Ajouter onPress={() => navigation.navigate('Detail', { idMeal: recipe.idMeal })}

// TODO [2.5] Mettre à jour App.tsx
//   - Importer et rendre <AppNavigator /> à la place du contenu par défaut

// ────────────────────────────────────────────────────────────
// PARTIE 3 — Données & API
// ────────────────────────────────────────────────────────────

// TODO [3.1] Créer api/meals.ts
//   - Définir BASE_URL = 'https://www.themealdb.com/api/json/v1/1'
//   - Créer searchMeals(query: string): Promise<Meal[]>
//     → fetch `${BASE_URL}/search.php?s=${query}`
//     → retourner meals ?? [] (gérer le cas null)
//   - Créer getMealById(id: string): Promise<MealDetail | null>
//     → fetch `${BASE_URL}/lookup.php?i=${id}`
//     → retourner meals[0] ?? null
//   - (Bonus) Créer getRandomMeal(): Promise<Meal>
//   - (Bonus) Créer getCategories(): Promise<Category[]>

// TODO [3.2] Mettre à jour screens/HomeScreen.tsx
//   - Remplacer les données factices par un appel à searchMeals()
//   - Appeler searchMeals dans un useEffect déclenché par le texte de recherche
//   - Gérer isLoading → afficher <ActivityIndicator />
//   - Gérer error → afficher un message d'erreur
//   - Gérer liste vide → afficher "Aucune recette trouvée"
//   - (Bonus) Ajouter un debounce sur la recherche pour éviter trop de requêtes

// TODO [3.3] Mettre à jour screens/DetailScreen.tsx
//   - Appeler getMealById(idMeal) dans un useEffect
//   - Afficher : image (Image), nom (Text), instructions (ScrollView + Text)
//   - Extraire et afficher la liste des ingrédients (strIngredient1..20 + strMeasure1..20)
//   - Gérer isLoading et erreur

// ────────────────────────────────────────────────────────────
// PARTIE 4 — État global avec Redux
// ────────────────────────────────────────────────────────────

// TODO [4.1] Créer store/favoritesSlice.ts
//   - Installer : @reduxjs/toolkit react-redux
//   - Créer le slice avec createSlice
//   - État initial : { favorites: Meal[] }
//   - Reducer addFavorite(state, action: PayloadAction<Meal>)
//     → vérifier que l'id n'est pas déjà présent avant d'ajouter
//   - Reducer removeFavorite(state, action: PayloadAction<string>)
//     → filtrer par idMeal
//   - Exporter les actions et le reducer

// TODO [4.2] Créer store/recipesSlice.ts  (bonus cache)
//   - État initial : { results: Meal[], loading: boolean, error: string | null }
//   - Créer un AsyncThunk fetchRecipes(query: string) qui appelle searchMeals()
//   - Gérer les cas pending / fulfilled / rejected avec extraReducers

// TODO [4.3] Créer store/index.ts
//   - Configurer le store avec configureStore (favoritesReducer + recipesReducer)
//   - Exporter RootState et AppDispatch pour le typage

// TODO [4.4] Mettre à jour App.tsx
//   - Importer <Provider store={store}> et envelopper <AppNavigator />

// TODO [4.5] Mettre à jour screens/DetailScreen.tsx
//   - Récupérer les favoris avec useSelector((state: RootState) => state.favorites.favorites)
//   - Vérifier si la recette courante est déjà en favori
//   - Ajouter un bouton ❤️ / 🤍 qui dispatch addFavorite ou removeFavorite

// TODO [4.6] Mettre à jour screens/HomeScreen.tsx  (si bonus recipesSlice)
//   - Remplacer le useState local par useSelector + dispatch(fetchRecipes(query))

// ────────────────────────────────────────────────────────────
// PARTIE 5 — Persistance & finitions
// ────────────────────────────────────────────────────────────

// TODO [5.1] Mettre à jour store/index.ts
//   - Installer : redux-persist @react-native-async-storage/async-storage
//   - Créer persistConfig avec storage AsyncStorage et key 'root'
//   - Envelopper favoritesReducer avec persistReducer
//   - Créer et exporter persistor avec persistStore(store)

// TODO [5.2] Mettre à jour App.tsx
//   - Importer <PersistGate loading={null} persistor={persistor}>
//   - L'envelopper autour de <AppNavigator /> (à l'intérieur de <Provider>)

// TODO [5.3] Créer screens/FavoritesScreen.tsx
//   - Récupérer les favoris depuis le store Redux avec useSelector
//   - Afficher une FlatList avec RecipeCard (même composant que HomeScreen)
//   - Gérer le cas liste vide → "Vous n'avez pas encore de favoris"
//   - Chaque carte navigue vers DetailScreen avec l'idMeal

// TODO [5.4] Polish UI — StyleSheet dans chaque screen/component
//   - HomeScreen  : style du TextInput, espacement FlatList, états loading/erreur
//   - DetailScreen: image plein largeur, scroll, mise en forme ingrédients
//   - FavoritesScreen: cohérence avec HomeScreen
//   - RecipeCard  : ombre légère, image arrondie, typographie

// ────────────────────────────────────────────────────────────
// BONUS — Si tu as de l'avance
// ────────────────────────────────────────────────────────────

// TODO [B.1] screens/HomeScreen.tsx
//   - Ajouter un bouton "Recette au hasard" qui appelle getRandomMeal()
//     et navigue directement vers DetailScreen avec l'idMeal reçu

// TODO [B.2] screens/HomeScreen.tsx
//   - Ajouter un filtre par catégorie (appel getCategories() au montage)
//   - Afficher les catégories en ScrollView horizontal au-dessus de la FlatList
//   - Filtrer les résultats selon la catégorie sélectionnée

// TODO [B.3] store/recipesSlice.ts
//   - Mettre en cache les résultats par query pour éviter des appels réseau répétés
//   - Vérifier dans HomeScreen si le cache contient déjà la query avant de fetcher

// TODO [B.4] App.tsx / navigation/AppNavigator.tsx
//   - Ajouter un thème sombre avec useColorScheme()
//   - Passer le thème à NavigationContainer (DarkTheme / DefaultTheme)

// TODO [B.5] screens/DetailScreen.tsx
//   - Afficher le lien vidéo YouTube (strYoutube) avec un bouton "Voir la vidéo"
//   - Ouvrir avec Linking.openURL()