import { Schema, model, models, Types } from "mongoose";


export type PubType = "article" | "book" | "chapter" | "conference" | "conference-paper" | "report" | "thesis" | "other" | "journal-article";


export interface IPublication {
    _id: Types.ObjectId;
    scholarIds: Types.ObjectId[]; // refs: Scholar - multiple scholars
    title: string;
    year?: number;
    venue?: string;
    type?: PubType;
    authors?: string[];
    abstract?: string;
    quote?: string; // Key quote or excerpt from the publication
    doi?: string;
    url?: string;
    keywordIds: Types.ObjectId[]; // refs: Keyword
    tags?: string[];
    isVietnamLaborRelated?: boolean | null;
    citations: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePublicationInput {
    title: string;
    authors: string[];
    journalPublisher?: string;
    year?: number;
    doi?: string;
    url?: string;
    citationCount?: number;
    abstract?: string;
    quote?: string;
    publicationType?: string;
    isSelected?: boolean;
}


const PublicationSchema = new Schema<IPublication>({
    scholarIds: [{ type: Schema.Types.ObjectId, ref: "Scholar", default: [] }],
    title: { type: String, required: true },
    year: { type: Number },
    venue: { type: String },
    type: { type: String, enum: ["article", "book", "chapter", "conference", "conference-paper", "report", "thesis", "other", "journal-article"], default: "article" },
    authors: { type: [String], default: [] },
    abstract: { type: String },
    quote: { type: String, default: '' },
    doi: { 
        type: String, 
        unique: true, 
        sparse: true,
        validate: {
            validator: function(v: string) {
                return !v || v.trim() !== '';
            },
            message: 'DOI cannot be empty string'
        }
    },
    url: { type: String },
    keywordIds: [{ type: Schema.Types.ObjectId, ref: "Keyword", default: [] }],
    tags: { type: [String], default: [] },
    isVietnamLaborRelated: { type: Boolean, default: null },
    citations: { type: Number, default: 0 },
}, { timestamps: true });


// Indexes for scholar timeline and keyword relevance
PublicationSchema.index({ scholarIds: 1, year: -1 });
PublicationSchema.index({ keywordIds: 1 });
PublicationSchema.index({ isVietnamLaborRelated: 1 });
PublicationSchema.index({ citations: -1 });


export const Publication = models.Publication || model<IPublication>("Publication", PublicationSchema);