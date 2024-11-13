import mongoose, { Document, Schema } from 'mongoose';

interface ISpell extends Document {
    name: string;
    dieSize: number;
    dieCount: number;
}

const SpellSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    dieSize: {
        type: Number,
        required: true,
    },
    dieCount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Spell = mongoose.model<ISpell>('Spell', SpellSchema);

export default Spell;
