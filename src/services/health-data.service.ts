export const ACTION_GET_READINGS = 'getreadings';

export const READING_HEART_RATE = 'heartrate';
export const READING_SPO2 = 'SPO2';
export const READING_BLOOD_PRESSURE_SYSTOLIC = 'blood_pressure_systolic';
export const READING_PAIN_LEVEL = 'pain_level';

export type ReadingName =
    | typeof READING_HEART_RATE
    | typeof READING_SPO2
    | typeof READING_BLOOD_PRESSURE_SYSTOLIC
    | typeof READING_PAIN_LEVEL;

export type GetHealthDataInput = {
    action: typeof ACTION_GET_READINGS;
    userid: string;
    reading_names?: ReadingName[];
};

