import axios, { AxiosResponse } from 'axios';

import { API_URL } from './constants';

export type MetricsSectionProps = {
    formatMetricData: (key: string) => { date: string; value: number }[];
};

// Types for API requests
interface GetReadingsRequest {
    action: 'getreadings';
    userid: string;
    reading_names?: string[];
}

interface AddReadingRequest {
    action: 'addreading';
    userid: string;
    readingName: string;
    readingValue: number;
    readingunit: string;
    readingTS: string;
}

export interface ReadingsList {
    readings: Reading[];
}

export interface Reading {
    readingName: string;
    readingValue: number;
    readingTS: string;
    readingunit: string;
}

// Function to fetch health readings
export async function fetchHealthReadings(userId: string) {
    const response = await axios.post<
        ReadingsList,
        AxiosResponse<ReadingsList>,
        GetReadingsRequest
    >(API_URL, {
        action: 'getreadings',
        userid: userId,
    });

    return response.data;
}

// Function to add a health reading
export const addHealthReading = async (
    userId: string,
    readingName: string,
    value: number,
    unit: string
) => {
    const now = new Date().toISOString().replace('T', ' ').split('.')[0];

    const response = await axios.post(API_URL, {
        action: 'addreading',
        userid: userId,
        readingName,
        readingValue: value,
        readingunit: unit,
        readingTS: now,
    } as AddReadingRequest);

    return response.data;
};
