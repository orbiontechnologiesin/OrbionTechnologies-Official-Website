/**
 * ==============================================================================
 * ORBION TECHNOLOGIES — DATABASE TYPE DEFINITIONS
 * ==============================================================================
 * Generated database interfaces representing the Supabase PostgreSQL schema.
 * Strictly typed for Row Level Security, RPC functions, and table operations.
 * ==============================================================================
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ContactLeadStatus = "new" | "contacted" | "qualified" | "closed";
export type AdminRole = "super_admin" | "admin" | "operator" | "viewer";
export type DemoRequestStatus = "pending" | "contacted" | "scheduled" | "completed" | "cancelled";
export type NewsletterStatus = "subscribed" | "unsubscribed";
export type EmailOutboxStatus = "pending" | "processing" | "sent" | "failed";
export type EmailRelatedEntityType = "contact_lead" | "demo_request" | "newsletter" | "system";

export type OrbionProductId =
  | "orbion-crm"
  | "orbion-ai-chatbot"
  | "orbion-bookings"
  | "orbion-fit"
  | "orbion-dine"
  | "orbion-docs"
  | "orbion-insights";

export interface Database {
  public: {
    Tables: {
      contact_leads: {
        Row: {
          id: string;
          reference: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          company: string | null;
          website: string | null;
          ip_hash: string | null;
          subject: string;
          message: string;
          source: string;
          status: ContactLeadStatus;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference?: string | null;
          full_name: string;
          email: string;
          phone?: string | null;
          company?: string | null;
          website?: string | null;
          ip_hash?: string | null;
          subject: string;
          message: string;
          source?: string;
          status?: ContactLeadStatus;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference?: string | null;
          full_name?: string;
          email?: string;
          phone?: string | null;
          company?: string | null;
          website?: string | null;
          ip_hash?: string | null;
          subject?: string;
          message?: string;
          source?: string;
          status?: ContactLeadStatus;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "contact_leads_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      demo_requests: {
        Row: {
          id: string;
          reference: string;
          full_name: string;
          email: string;
          company: string | null;
          phone: string | null;
          product_id: OrbionProductId;
          preferred_date: string | null;
          message: string | null;
          source: string;
          status: DemoRequestStatus;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference: string;
          full_name: string;
          email: string;
          company?: string | null;
          phone?: string | null;
          product_id: OrbionProductId;
          preferred_date?: string | null;
          message?: string | null;
          source?: string;
          status?: DemoRequestStatus;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference?: string;
          full_name?: string;
          email?: string;
          company?: string | null;
          phone?: string | null;
          product_id?: OrbionProductId;
          preferred_date?: string | null;
          message?: string | null;
          source?: string;
          status?: DemoRequestStatus;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "demo_requests_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          status: NewsletterStatus;
          consent: boolean;
          consent_timestamp: string;
          unsubscribe_token: string;
          source: string;
          unsubscribed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          status?: NewsletterStatus;
          consent?: boolean;
          consent_timestamp?: string;
          unsubscribe_token: string;
          source?: string;
          unsubscribed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          status?: NewsletterStatus;
          consent?: boolean;
          consent_timestamp?: string;
          unsubscribe_token?: string;
          source?: string;
          unsubscribed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      email_outbox: {
        Row: {
          id: string;
          related_entity_type: EmailRelatedEntityType;
          related_entity_id: string | null;
          recipient: string;
          template: string;
          subject: string;
          payload: Json;
          provider_message_id: string | null;
          status: EmailOutboxStatus;
          attempts: number;
          max_attempts: number;
          last_error: string | null;
          next_retry_at: string;
          sent_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          related_entity_type: EmailRelatedEntityType;
          related_entity_id?: string | null;
          recipient: string;
          template: string;
          subject: string;
          payload?: Json;
          provider_message_id?: string | null;
          status?: EmailOutboxStatus;
          attempts?: number;
          max_attempts?: number;
          last_error?: string | null;
          next_retry_at?: string;
          sent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          related_entity_type?: EmailRelatedEntityType;
          related_entity_id?: string | null;
          recipient?: string;
          template?: string;
          subject?: string;
          payload?: Json;
          provider_message_id?: string | null;
          status?: EmailOutboxStatus;
          attempts?: number;
          max_attempts?: number;
          last_error?: string | null;
          next_retry_at?: string;
          sent_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role: AdminRole;
          avatar_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          role?: AdminRole;
          avatar_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          role?: AdminRole;
          avatar_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string | null;
          action: string;
          entity_type: string;
          entity_id: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          action: string;
          entity_type: string;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_id?: string | null;
          action?: string;
          entity_type?: string;
          entity_id?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          id?: string;
          key: string;
          value: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "site_settings_updated_by_fkey";
            columns: ["updated_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_active_staff: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_admin_or_super: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      contact_lead_status: ContactLeadStatus;
      admin_role: AdminRole;
      demo_request_status: DemoRequestStatus;
      newsletter_status: NewsletterStatus;
      email_outbox_status: EmailOutboxStatus;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  T extends keyof Database["public"]["Tables"]
> = Database["public"]["Tables"][T]["Row"];

export type TablesInsert<
  T extends keyof Database["public"]["Tables"]
> = Database["public"]["Tables"][T]["Insert"];

export type TablesUpdate<
  T extends keyof Database["public"]["Tables"]
> = Database["public"]["Tables"][T]["Update"];
