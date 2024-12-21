// src/app/admin/team/page.tsx
"use client";

import { useState } from "react";

export default function TeamManagement() {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [members, setMembers] = useState([{ id: Date.now(), username: "", fullName: "", position: "" }]);

    const handleAddMember = () => {
        setMembers([...members, { id: Date.now(), username: "", fullName: "", position: "" }]);
    };

    const handleSubmit = async () => {
        const response = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color, members }),
        });

        if (response.ok) {
        alert("Team created successfully!");
        } else {
        alert("Failed to create team.");
        }
    };

    return (
        <div>
        <h1>Create Team</h1>
        <form onSubmit={(e) => e.preventDefault()}>
            <input
            type="text"
            placeholder="Team Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="Team Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            />
            {members.map((member, index) => (
            <div key={member.id}>
                <input
                type="text"
                placeholder="Username"
                value={member.username}
                onChange={(e) =>
                    setMembers(
                    members.map((m, i) => (i === index ? { ...m, username: e.target.value } : m))
                    )
                }
                />
                <input
                type="text"
                placeholder="Full Name"
                value={member.fullName}
                onChange={(e) =>
                    setMembers(
                    members.map((m, i) => (i === index ? { ...m, fullName: e.target.value } : m))
                    )
                }
                />
                <input
                type="text"
                placeholder="Position"
                value={member.position}
                onChange={(e) =>
                    setMembers(
                    members.map((m, i) => (i === index ? { ...m, position: e.target.value } : m))
                    )
                }
                />
            </div>
            ))}
            <button type="button" onClick={handleAddMember}>
            Add Member
            </button>
            <button type="button" onClick={handleSubmit}>
            Save Team
            </button>
        </form>
        </div>
    );
}