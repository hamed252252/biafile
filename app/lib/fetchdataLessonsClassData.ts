import { ApiResponseLessonHeading } from "../type/edcation";

export async function fetchDataLessonsClassData(): Promise<{
    lessons: ApiResponseLessonHeading;
    classData: LocalClassData;
}> {
    const [lRes, cRes] = await Promise.all([
        fetch(
            "https://api.biafile.ir/Api/LessonHeadings/AllForPublicPage"
        ),
        fetch(
            "https://api.biafile.ir/Api/Categorys/Public"
        ),
    ]);
    if (!lRes.ok || !cRes.ok)
        throw new Error("fetch failed");
    const lessons =
        (await lRes.json()) as ApiResponseLessonHeading;
    const raw = await cRes.json();
    return {
        lessons,
        classData: { entities: raw.entities },
    };
}

// **بدون export** – مدل داخلی فقط
export interface CategoryEntity {
    id: number;
    title: string;
    description: string | null;
    uniqCode: string;
    subResultCategorys: CategoryEntity[];
}
// **بدون export**
export interface LocalClassData {
    entities: CategoryEntity[];
}
