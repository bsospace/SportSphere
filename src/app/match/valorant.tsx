import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ValorantContent() {
    const router = useRouter();

    return (
        <div className="p-4">
            <p className="md:text-center text-left text-2xl font-semibold mb-4">Valorant</p>
                        
                        <Button onClick={() => router.push("/match/valorant")}>ดูสายการแข่งขัน Valorant</Button>
                        <div className="mt-4">
        <h2 className="">กติกาการแข่งขันทั่วไป</h2>

        <h3>Coming Soon . . .</h3>
    
    </div>
        </div>
    );
}