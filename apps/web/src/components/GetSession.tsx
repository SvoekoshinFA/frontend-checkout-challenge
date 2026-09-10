import { useContext, useState } from 'react';
import { Global } from '../App';
import type { Session } from '../types/Session.ts';
import type { Response } from '../types/Response.ts';

export default function GetSession() {
    const { setSession } = useContext(Global);
    const [loading, setLoading] = useState(false)
    const getSession = async (): Promise<void> => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/sessions', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: { 'Content-Type': 'application/json' },
            });

            const json = await response.json() as Response<Session>;
            setSession(json.data ?? null);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button onClick={getSession} disabled={!!loading}>Войти</button>
    );
}
