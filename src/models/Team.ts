// src/models/Team.ts
import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    members: [
        {
        username: { type: String, required: true },
        fullName: { type: String, required: true },
        position: { type: String, required: true },
        },
    ],
});

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);