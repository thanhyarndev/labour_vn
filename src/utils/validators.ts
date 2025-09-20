import { z } from "zod";


export const KeywordInput = z.object({
name: z.string().min(1),
displayName: z.string().min(1),
aliases: z.array(z.string()).optional().default([]),
slug: z.string().min(1),
description: z.string().optional(),
isApproved: z.boolean().optional(),
});


export const PublicationInput = z.object({
scholarId: z.string().min(1).optional(), // Optional: scholar ID (will be set during creation)
title: z.string().min(1),
year: z.number().int().optional(),
venue: z.string().optional(),
type: z.enum(["article","book","chapter","conference","conference-paper","report","thesis","other","journal-article"]).optional(),
authors: z.array(z.string()).optional().default([]),
abstract: z.string().optional(),
quote: z.string().optional(),
doi: z.string().optional(),
  url: z.string().url().optional().or(z.undefined()).or(z.literal("")),
isVietnamLaborRelated: z.boolean().nullable().optional(),
tags: z.array(z.string()).optional().default([]),
});


export const ScholarCreateInput = z.object({
  fullName: z.string().min(1),
  familyName: z.string().optional(),
  givenName: z.string().optional(),
  normalizedName: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().optional(),
  affiliation: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  homepageUrl: z.string().url().optional().or(z.undefined()),
  scholarUrl: z.string().url().optional().or(z.undefined()),
  institutionalProfileUrl: z.string().url().optional().or(z.undefined()),
  orcid: z.string().optional(),
  bio: z.string().optional(),
  researchInterests: z.string().optional(),
  expertiseAreas: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.undefined()),
  keywordSlugs: z.array(z.string()).default([]), // existing keywords by slug
  newKeywords: z.array(KeywordInput).default([]), // new keywords to create
  publicationIds: z.array(z.string()).default([]), // existing publications by ID
  newPublications: z.array(PublicationInput).default([]), // new publications to create
  publications: z.array(PublicationInput).default([]), // legacy: initial publications
  status: z.enum(["active","hidden"]).optional().default("active"),
});