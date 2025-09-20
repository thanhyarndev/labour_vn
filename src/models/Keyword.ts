import { Schema, model, models, Types } from "mongoose";


export interface IKeyword {
    _id: Types.ObjectId;
    name: string; // normalized, lowercase, no diacritics
    displayName: string; // UI label with diacritics
    aliases?: string[];
    slug: string;
    description?: string;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateKeywordInput {
    name: string;
    displayName: string;
    slug?: string;
    aliases?: string[];
    description?: string;
    isApproved?: boolean;
}

export interface UpdateKeywordInput {
    name?: string;
    displayName?: string;
    aliases?: string[];
    description?: string;
    isApproved?: boolean;
}


const KeywordSchema = new Schema<IKeyword>({
    name: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true },
    aliases: { type: [String], default: [], lowercase: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    isApproved: { type: Boolean, default: true },
}, { timestamps: true });


// Indexes for lookup by name/aliases and slug
KeywordSchema.index({ name: 1 }, { unique: true });
KeywordSchema.index({ aliases: 1 });
KeywordSchema.index({ slug: 1 }, { unique: true });


export const Keyword = models.Keyword || model<IKeyword>("Keyword", KeywordSchema);