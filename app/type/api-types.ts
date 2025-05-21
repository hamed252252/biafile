// Centralized type definitions for API responses
export interface SubResultCategory {
    id: number;
    title: string;
    description: string | null;
    uniqCode: string;
    subResultCategorys: SubResultCategory[];
}

export interface Entity extends SubResultCategory {
    countLessonHeading: number;
}

export interface ApiResponseCategorysCategorys {
    entities: Entity[];
}

export interface LessonLink {
    name: string;
    url: string;
}

export type IconName =
    | "sampleQuestion"
    | "educationalFile"
    | "QnA"
    | "onlineTest";

export interface Stat {
    label: string;
    value: number;
    iconName: IconName;
}
