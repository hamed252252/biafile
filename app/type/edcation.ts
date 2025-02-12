export interface Subject {
    name: string;
    icon: string;
    color: string;
}

export interface EducationalLevel {
    levelName: string;
    numberOfClasses: number;
    levelSlug: string;
}

export interface DegreeGradePageProps {
    degree: string;
    grade: string;
    currentDegree: EducationalLevel;
    gradeName: string;
}

export interface ApiResponseLessonHeading {
    status: string;
    statusCode: number;
    message: string;
    entities: LessonHeadingEntity[];
    countAllRecordTable: number;
}

export interface LessonHeadingEntity {
    id: number;
    lessonHeadingStatusID: number;
    categoryID: number;
    title: string;
    shortDescription: string;
    longDescription: string;
    time: string;
    designer: string;
    jsonPictures: JsonPicture[];
    jsonFiles: any[]; // Use a more specific type if you know the structure of files
    jsonVideos: any | null; // Use a specific type if you know the structure of videos
    visible: boolean;
    imageUIrl: string | null;
    resultLessonHeadingStatus: LessonHeadingStatus;
    registerDate: string;
    editDate: string;
    uniqCode: string | null;
    registerTime: string;
    editTime: string;
    jsonLableTexts: any | null; // Use a specific type if you know the structure of labels
    resultJsonLables: JsonLabel[];
}

export interface JsonPicture {
    Title: string;
    PathFileName: string;
}

export interface LessonHeadingStatus {
    id: number;
    title: string;
    visible: boolean;
    registerDate: string | null;
    editDate: string | null;
    uniqCode: string | null;
    registerTime: string;
    editTime: string;
    jsonLableTexts: any | null; // Use a specific type if you know the structure
    resultJsonLables: any | null; // Use a specific type if you know the structure
}

export interface JsonLabel {
    id: string;
    text: string;
}

export interface Lesson {
    id: number;
    lessonHeadingStatusID: number;
    categoryID: number;
    title: string;
    shortDescription: string;
    longDescription: string;
    time: string;
    designer: string;
    jsonPictures?: {
        Title: string;
        PathFileName: string;
    }[];
    jsonFiles?: any[]; // اگر اطلاعات مشخصی ندارد
    jsonVideos?: any | null; // اگر مقدار `null` دارد
    visible: boolean;
    imageUIrl?: string | null;
    registerDate: string;
    editDate: string;
    uniqCode?: string | null;
    registerTime: string;
    editTime: string;
    jsonLableTexts?: any | null;
    resultJsonLables?: any[];
}

export interface LessonHeadingsApiResponse {
    status: string;
    statusCode: number;
    message: string;
    entities: Lesson[];
    countAllRecordTable: number;
}
