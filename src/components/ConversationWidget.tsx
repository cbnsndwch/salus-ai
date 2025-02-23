import { useCallback } from 'react';
import { useConversation } from '@11labs/react';
import { BotIcon, BotOffIcon } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

// import { useQuery } from '@tanstack/react-query';
// import { getVoiceAiEndpoint } from '@/services/voice-ai-endpoint.service';

export default function ConversationWidget() {
    // const { data } = useQuery({
    //     queryKey: ['voiceAiEndpoint'],
    //     queryFn: () => getVoiceAiEndpoint(),
    // });

    const conversation = useConversation({
        onConnect: () => console.log('Connected'),
        onDisconnect: () => console.log('Disconnected'),
        onMessage: (message: any) => console.log('Message:', message),
        onError: (error: any) => console.error('Error:', error),

        dynamicVariables: {
            user_name: 'John',
            account_type: 'premium',
            msg: 'test',
        },
        clientTools: {
            async get_missed_pills() {
                const missedPills = [
                    {
                        pillName: 'Aspirin',
                        missedOn: 'last two days',
                    },
                ];

                return JSON.stringify(missedPills);
            },
        },
    });

    const startConversation = useCallback(async () => {
        try {
            // Request microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true });

            // Start the conversation with your agent
            await conversation.startSession({
                agentId: import.meta.env.VITE_11LABS_AGENT_ID,
                // getVoiceAiEndpoint,
            });
        } catch (error) {
            console.error('Failed to start conversation:', error);
        }
    }, [conversation]);

    const stopConversation = useCallback(async () => {
        await conversation.endSession();
    }, [conversation]);

    // if (!data) {
    //     return null;
    // }

    return (
        <div className="flex flex-col items-center gap-4">
            <div className="group fixed bottom-8 right-8 cursor-pointer pr-4 pb-10 lg:pb-4 flex items-end justify-end w-24 h-24">
                <Tooltip delayDuration={0}>
                    <TooltipTrigger
                        onClick={() => {
                            if (conversation.status === 'connected') {
                                stopConversation();
                            } else {
                                startConversation();
                            }
                        }}
                        className="text-white shadow-xl flex justify-center group-hover:scale-110 items-center p-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute transition-width ease-in-out duration-300"
                    >
                        {conversation.status === 'connected' ? (
                            <BotOffIcon className="w-8 h-8 " />
                        ) : (
                            <BotIcon className="w-8 h-8 " />
                        )}
                    </TooltipTrigger>
                    <TooltipContent className="mb-2 mr-2" arrowPadding={2}>
                        {conversation.status === 'connected'
                            ? 'Stop Conversation'
                            : 'Start Conversation'}
                    </TooltipContent>
                </Tooltip>

                <div role="button"></div>
            </div>
        </div>
    );
}
