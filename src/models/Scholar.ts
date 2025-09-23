import { Schema, model, models, Types } from "mongoose";

export type ScholarStatus = "active" | "hidden";

export interface IScholar {
  _id: Types.ObjectId;
  fullName: string;
  familyName?: string;
  givenName?: string;
  normalizedName: string; // lowercase, no diacritics for search
  slug: string;
  title?: string; // Dr., Prof., etc.
  affiliation?: string;
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
  homepageUrl?: string;
  scholarUrl?: string;
  institutionalProfileUrl?: string;
  orcid?: string;
  bio?: string;
  researchInterests?: string;
  expertiseAreas?: string;
  avatarUrl?: string;
  keywordIds: Types.ObjectId[]; // refs keywords
  keywordNames: string[]; // denormalized lowercase names for quick filters
  publicationIds: Types.ObjectId[]; // refs publications
  publicationCount: number;
  relatedPublicationCount: number;
  frequentContributor: boolean;
  status: ScholarStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ScholarSchema = new Schema<IScholar>({
  fullName: { type: String, required: true },
  familyName: { type: String },
  givenName: { type: String },
  normalizedName: { type: String, required: true, lowercase: true, trim: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String },
  affiliation: { type: String },
  department: { type: String },
  position: { type: String },
  email: { type: String },
  phone: { type: String },
  homepageUrl: { type: String },
  scholarUrl: { type: String },
  institutionalProfileUrl: { type: String },
  orcid: { type: String },
  bio: { type: String },
  researchInterests: { type: String },
  expertiseAreas: { type: String },
  avatarUrl: { type: String },
  keywordIds: [{ type: Schema.Types.ObjectId, ref: "Keyword", default: [] }],
  keywordNames: { type: [String], default: [], lowercase: true },
  publicationIds: [{ type: Schema.Types.ObjectId, ref: "Publication", default: [] }],
  publicationCount: { type: Number, default: 0 },
  relatedPublicationCount: { type: Number, default: 0 },
  frequentContributor: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "hidden"], default: "active" },
}, { timestamps: true });

// Derived flag: set frequentContributor based on threshold
ScholarSchema.pre("save", function (next) {
  const threshold = 3; // example threshold
  this.frequentContributor = (this.relatedPublicationCount ?? 0) >= threshold;
  next();
});

// Indexes
ScholarSchema.index({ normalizedName: 1 });
ScholarSchema.index({ slug: 1 }, { unique: true });
ScholarSchema.index({ status: 1 });
// Critical path: keyword-based search to scholars
ScholarSchema.index({ keywordIds: 1, status: 1 });
ScholarSchema.index({ keywordNames: 1 });
// Publication-based search
ScholarSchema.index({ publicationIds: 1 });

export const Scholar = models.Scholar || model<IScholar>("Scholar", ScholarSchema);

// Input interfaces for API
export interface CreateScholarInput {
  firstName: string;
  lastName: string;
  middleName?: string;
  title?: string;
  position?: string;
  institution?: string;
  department?: string;
  email?: string;
  phone?: string;
  website?: string;
  orcidId?: string;
  googleScholarUrl?: string;
  institutionalProfileUrl?: string;
  bio?: string;
  researchInterests?: string;
  expertiseAreas?: string;
  slug?: string; // Will be auto-generated
}

export interface UpdateScholarInput {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  title?: string;
  position?: string;
  institution?: string;
  department?: string;
  email?: string;
  phone?: string;
  website?: string;
  orcidId?: string;
  googleScholarUrl?: string;
  institutionalProfileUrl?: string;
  bio?: string;
  researchInterests?: string;
  expertiseAreas?: string;
  slug?: string;
}