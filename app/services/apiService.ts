import { Meal } from '../types';
import { MealDetail} from "../types";

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMeals(query: string): Promise<Meal[]> {
    const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await res.json();
    return data.meals ?? [];
}

export async function getMealById(id: string): Promise<MealDetail | null> {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals?.[0] ?? null;
}