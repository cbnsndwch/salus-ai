import axios from 'axios';

import { API_URL } from './constants';

type VoiceAiEndpointResponse = {
    signedUrl: string;
};

export async function getVoiceAiEndpoint() {
    const response = await axios.get<VoiceAiEndpointResponse>(API_URL, {
        params: { getUrl: true },
    });

    return response.data;
}
