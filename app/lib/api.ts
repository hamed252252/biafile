import { ApiResponseCategorysCategorys } from "../type/api-types";

const API_URL =
    "https://api.biafile.ir/Api/Categorys/Public";

export async function fetchCategories(): Promise<ApiResponseCategorysCategorys> {
    try {
        const response = await fetch(API_URL, {
            next: { revalidate: 3600 }, // 1-hour server cache
        });

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Return empty data structure to prevent UI crashes
        return { entities: [] };
    }
}
