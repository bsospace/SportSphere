/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Event {
    image?: string;
    title: string;
    time: string;
    location: string;
    tags: string[];
    link?: string;
    linkLabel?: string;
}

const UpcomingEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/assets/data/events.json`);
                if (!response.ok) throw new Error(`Failed to load events.json`);
                const data = await response.json();
                setEvents(data.events || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <motion.div 
                className="bg-white shadow-lg rounded-lg p-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                >
                <h2 className="text-xl font-semibold m-4">เร็วๆ นี้</h2>
                <p className="text-gray-500">Loading events...</p>
            </motion.div>
        );
    }

    if (error) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-semibold m-4">เร็วๆ นี้</h2>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h2 className="text-xl font-semibold m-4">เร็วๆ นี้</h2>
                <p className="text-gray-500">No upcoming events.</p>
            </div>
        );
    }

    return (
        <motion.div 
        className="bg-white shadow-lg rounded-lg p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        >
            <h2 className="text-xl font-semibold m-4">เร็วๆ นี้</h2>
            {/* Grid layout for events */}
            <div
                className={`grid ${
                    events.length > 3 ? "grid-cols-2" : "grid-cols-1"
                } gap-6`}
            >
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 border-b border-gray-200 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
                    >
                        {/* Event Image (optional) */}
                        {event.image && (
                            <Image
                                src={event.image}
                                alt={event.title}
                                width={100}
                                height={100}
                                className="rounded-lg"
                            />
                        )}
                        {/* Event Details */}
                        <div className="flex-1 text-left">
                            {/* Time */}
                            <p className="text-sm text-gray-500">{event.time}</p>
                            {/* Title */}
                            <h3 className="text-lg font-medium">{event.title}</h3>
                            {/* Location */}
                            <p className="text-sm text-gray-600">{event.location}</p>
                            {/* Tags */}
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {event.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            {/* Join Meeting Button */}
                            {event.link && (
                                <button className="mt-2 text-blue-600 hover:underline" onClick={() => window.open(event.link, "_blank")}>
                                    {event.linkLabel || "Link"}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default UpcomingEvents;
