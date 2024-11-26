import mongoose, { Schema, model, models } from 'mongoose';

const SportSchema = new Schema({
    name: { type: String, required: true },
    schedule: [
        {
        matchDate: Date,
        teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
        score: { type: Object },
        },
    ],
});

export default models.Sport || model('Sport', SportSchema);