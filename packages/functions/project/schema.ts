import { z } from "zod";

// Base project schema
export const projectSchema = z.object({
  id: z.string().uuid().optional(), // Optional for creation
  name: z.string().min(1, "Project name is required").max(255),
  address: z.string().optional(),
  description: z.string().optional(),
  created_at: z.string().optional(), // Will be handled by the database
  updated_at: z.string().optional(), // Will be handled by the database
});

// Schema for creating a new project
export const createProjectSchema = projectSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema for updating an existing project
export const updateProjectSchema = projectSchema
  .partial()
  .omit({ id: true, created_at: true, updated_at: true });

// Schema for pagination parameters
export const paginationSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(10),
  offset: z.coerce.number().min(0).default(0),
});

// Export types
export type Project = z.infer<typeof projectSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;
