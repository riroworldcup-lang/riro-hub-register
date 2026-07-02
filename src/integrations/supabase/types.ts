export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      competitions: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          levels: string[]
          name: string
          participants: string[]
          sort_order: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          levels?: string[]
          name: string
          participants?: string[]
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          levels?: string[]
          name?: string
          participants?: string[]
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          image_url: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          comments: string | null
          competition_name: string
          created_at: string
          full_name: string
          id: string
          mobile_number: string
          participant_email: string | null
          school_name: string
          science_teacher_contact: string
          science_teacher_name: string
          standard_class: string
          team_mate_1_contact: string | null
          team_mate_1_name: string | null
          team_mate_10_contact: string | null
          team_mate_10_name: string | null
          team_mate_2_contact: string | null
          team_mate_2_name: string | null
          team_mate_3_contact: string | null
          team_mate_3_name: string | null
          team_mate_4_contact: string | null
          team_mate_4_name: string | null
          team_mate_5_contact: string | null
          team_mate_5_name: string | null
          team_mate_6_contact: string | null
          team_mate_6_name: string | null
          team_mate_7_contact: string | null
          team_mate_7_name: string | null
          team_mate_8_contact: string | null
          team_mate_8_name: string | null
          team_mate_9_contact: string | null
          team_mate_9_name: string | null
          team_mate_numbers: string | null
          team_mates: string | null
          team_name: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          comments?: string | null
          competition_name: string
          created_at?: string
          full_name: string
          id?: string
          mobile_number: string
          participant_email?: string | null
          school_name: string
          science_teacher_contact: string
          science_teacher_name: string
          standard_class: string
          team_mate_1_contact?: string | null
          team_mate_1_name?: string | null
          team_mate_10_contact?: string | null
          team_mate_10_name?: string | null
          team_mate_2_contact?: string | null
          team_mate_2_name?: string | null
          team_mate_3_contact?: string | null
          team_mate_3_name?: string | null
          team_mate_4_contact?: string | null
          team_mate_4_name?: string | null
          team_mate_5_contact?: string | null
          team_mate_5_name?: string | null
          team_mate_6_contact?: string | null
          team_mate_6_name?: string | null
          team_mate_7_contact?: string | null
          team_mate_7_name?: string | null
          team_mate_8_contact?: string | null
          team_mate_8_name?: string | null
          team_mate_9_contact?: string | null
          team_mate_9_name?: string | null
          team_mate_numbers?: string | null
          team_mates?: string | null
          team_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          comments?: string | null
          competition_name?: string
          created_at?: string
          full_name?: string
          id?: string
          mobile_number?: string
          participant_email?: string | null
          school_name?: string
          science_teacher_contact?: string
          science_teacher_name?: string
          standard_class?: string
          team_mate_1_contact?: string | null
          team_mate_1_name?: string | null
          team_mate_10_contact?: string | null
          team_mate_10_name?: string | null
          team_mate_2_contact?: string | null
          team_mate_2_name?: string | null
          team_mate_3_contact?: string | null
          team_mate_3_name?: string | null
          team_mate_4_contact?: string | null
          team_mate_4_name?: string | null
          team_mate_5_contact?: string | null
          team_mate_5_name?: string | null
          team_mate_6_contact?: string | null
          team_mate_6_name?: string | null
          team_mate_7_contact?: string | null
          team_mate_7_name?: string | null
          team_mate_8_contact?: string | null
          team_mate_8_name?: string | null
          team_mate_9_contact?: string | null
          team_mate_9_name?: string | null
          team_mate_numbers?: string | null
          team_mates?: string | null
          team_name?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string
          designation: string
          id: string
          image_url: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          designation: string
          id?: string
          image_url: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          designation?: string
          id?: string
          image_url?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      visitor_registrations: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          address_line_3: string | null
          address_line_4: string | null
          contact_number: string
          created_at: string
          division: string | null
          father_mobile: string | null
          father_name: string | null
          full_name: string
          id: string
          mother_mobile: string | null
          mother_name: string | null
          school_college_name: string | null
          standard: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          address_line_3?: string | null
          address_line_4?: string | null
          contact_number: string
          created_at?: string
          division?: string | null
          father_mobile?: string | null
          father_name?: string | null
          full_name: string
          id?: string
          mother_mobile?: string | null
          mother_name?: string | null
          school_college_name?: string | null
          standard?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          address_line_3?: string | null
          address_line_4?: string | null
          contact_number?: string
          created_at?: string
          division?: string | null
          father_mobile?: string | null
          father_name?: string | null
          full_name?: string
          id?: string
          mother_mobile?: string | null
          mother_name?: string | null
          school_college_name?: string | null
          standard?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
