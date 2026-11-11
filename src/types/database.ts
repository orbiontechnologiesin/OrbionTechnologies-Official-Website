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
export type AdminRole =
  | "super_admin"
  | "admin"
  | "editor"
  | "sales"
  | "hr"
  | "viewer";
export type DemoRequestStatus = "pending" | "contacted" | "scheduled" | "completed" | "cancelled";
export type NewsletterStatus = "subscribed" | "unsubscribed";
export type EmailOutboxStatus = "pending" | "processing" | "sent" | "failed";
export type EmailRelatedEntityType = "contact_lead" | "demo_request" | "newsletter" | "system";
export type ContentStatus = "draft" | "in_review" | "published" | "archived";
export type ProductStatus = "coming_soon" | "in_development" | "available";
export type MediaBucket = "media" | "documents";
export type AnalyticsDeviceCategory = "desktop" | "mobile" | "tablet" | "unknown";
export type NotificationCategory =
  | "lead"
  | "demo"
  | "newsletter"
  | "email_failure"
  | "cms"
  | "system"
  | "security";

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
      lead_notes: {
        Row: {
          id: string;
          lead_id: string;
          author_id: string;
          note: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          author_id: string;
          note: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          author_id?: string;
          note?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lead_notes_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "contact_leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_notes_author_id_fkey";
            columns: ["author_id"];
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
      blog_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          featured_image: string | null;
          category_id: string | null;
          author_id: string;
          status: ContentStatus;
          published_at: string | null;
          meta_title: string | null;
          meta_description: string | null;
          canonical_url: string | null;
          og_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          featured_image?: string | null;
          category_id?: string | null;
          author_id: string;
          status?: ContentStatus;
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          canonical_url?: string | null;
          og_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          featured_image?: string | null;
          category_id?: string | null;
          author_id?: string;
          status?: ContentStatus;
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          canonical_url?: string | null;
          og_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "blog_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "blog_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      products: {
        Row: {
          id: string;
          number: string;
          name: string;
          slug: string;
          category: string;
          category_group: string;
          headline: string;
          short_description: string;
          detailed_description: string | null;
          status: ProductStatus;
          status_notice: string | null;
          logo_url: string | null;
          features: Json;
          problems: Json;
          audiences: Json;
          workflow: Json;
          meta_title: string | null;
          meta_description: string | null;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          number: string;
          name: string;
          slug: string;
          category: string;
          category_group: string;
          headline: string;
          short_description: string;
          detailed_description?: string | null;
          status?: ProductStatus;
          status_notice?: string | null;
          logo_url?: string | null;
          features?: Json;
          problems?: Json;
          audiences?: Json;
          workflow?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          number?: string;
          name?: string;
          slug?: string;
          category?: string;
          category_group?: string;
          headline?: string;
          short_description?: string;
          detailed_description?: string | null;
          status?: ProductStatus;
          status_notice?: string | null;
          logo_url?: string | null;
          features?: Json;
          problems?: Json;
          audiences?: Json;
          workflow?: Json;
          meta_title?: string | null;
          meta_description?: string | null;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      case_studies: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string;
          client_name: string | null;
          industry: string | null;
          challenge: string | null;
          approach: string | null;
          solution: string | null;
          outcome: string | null;
          featured_image: string | null;
          technologies: string[];
          status: ContentStatus;
          author_id: string | null;
          published_at: string | null;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary: string;
          client_name?: string | null;
          industry?: string | null;
          challenge?: string | null;
          approach?: string | null;
          solution?: string | null;
          outcome?: string | null;
          featured_image?: string | null;
          technologies?: string[];
          status?: ContentStatus;
          author_id?: string | null;
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string;
          client_name?: string | null;
          industry?: string | null;
          challenge?: string | null;
          approach?: string | null;
          solution?: string | null;
          outcome?: string | null;
          featured_image?: string | null;
          technologies?: string[];
          status?: ContentStatus;
          author_id?: string | null;
          published_at?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "case_studies_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      media_assets: {
        Row: {
          id: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size_bytes: number;
          bucket: MediaBucket;
          storage_path: string;
          public_url: string | null;
          alt_text: string | null;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          original_name: string;
          mime_type: string;
          size_bytes: number;
          bucket?: MediaBucket;
          storage_path: string;
          public_url?: string | null;
          alt_text?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          filename?: string;
          original_name?: string;
          mime_type?: string;
          size_bytes?: number;
          bucket?: MediaBucket;
          storage_path?: string;
          public_url?: string | null;
          alt_text?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "media_assets_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      analytics_events: {
        Row: {
          id: string;
          event_name: string;
          page_path: string;
          referrer_domain: string | null;
          visitor_id: string;
          session_id: string;
          device_category: AnalyticsDeviceCategory;
          browser_category: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_name: string;
          page_path: string;
          referrer_domain?: string | null;
          visitor_id: string;
          session_id: string;
          device_category?: AnalyticsDeviceCategory;
          browser_category?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_name?: string;
          page_path?: string;
          referrer_domain?: string | null;
          visitor_id?: string;
          session_id?: string;
          device_category?: AnalyticsDeviceCategory;
          browser_category?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      admin_notifications: {
        Row: {
          id: string;
          recipient_user_id: string | null;
          title: string;
          message: string;
          category: NotificationCategory;
          related_entity_type: string | null;
          related_entity_id: string | null;
          link_url: string | null;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          recipient_user_id?: string | null;
          title: string;
          message: string;
          category: NotificationCategory;
          related_entity_type?: string | null;
          related_entity_id?: string | null;
          link_url?: string | null;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          recipient_user_id?: string | null;
          title?: string;
          message?: string;
          category?: NotificationCategory;
          related_entity_type?: string | null;
          related_entity_id?: string | null;
          link_url?: string | null;
          read_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admin_notifications_recipient_user_id_fkey";
            columns: ["recipient_user_id"];
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
      current_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: string | null;
      };
      can_manage_leads: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      can_manage_users: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      can_view_audit_logs: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      update_lead_status_with_audit: {
        Args: {
          p_lead_id: string;
          p_new_status: string;
          p_assigned_to?: string | null;
          p_internal_note?: string | null;
        };
        Returns: Json;
      };
    };
    Enums: {
      contact_lead_status: ContactLeadStatus;
      admin_role: AdminRole;
      demo_request_status: DemoRequestStatus;
      newsletter_status: NewsletterStatus;
      email_outbox_status: EmailOutboxStatus;
      content_status: ContentStatus;
      product_status: ProductStatus;
      media_bucket: MediaBucket;
      analytics_device_category: AnalyticsDeviceCategory;
      notification_category: NotificationCategory;
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
