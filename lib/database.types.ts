export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon_url: string | null
          display_order: number | null
          is_active: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon_url?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon_url?: string | null
          display_order?: number | null
          is_active?: boolean | null
          created_at?: string | null
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          category_id: string | null
          brand: string | null
          variants: Json
          image_url: string | null
          is_active: boolean | null
          tags: string[] | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category_id?: string | null
          brand?: string | null
          variants?: Json
          image_url?: string | null
          is_active?: boolean | null
          tags?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category_id?: string | null
          brand?: string | null
          variants?: Json
          image_url?: string | null
          is_active?: boolean | null
          tags?: string[] | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      members: {
        Row: {
          id: string
          vrk_id: string
          serial_number: number | null
          mobile: string
          full_name: string
          date_of_birth: string | null
          gender: string | null
          email: string | null
          permanent_address: Json | null
          temporary_address: Json | null
          delivery_pincode: string | null
          nominees: Json | null
          family_welfare: string | null
          identity_proofs: Json | null
          dream_box: string | null
          dream_description: string | null
          organizer_code: string | null
          signature_path: string | null
          selfie_path: string | null
          payment_reference: string | null
          payment_status: string | null
          membership_status: string | null
          is_admin: boolean | null
          created_at: string | null
          activated_at: string | null
        }
        Insert: {
          id?: string
          vrk_id?: string
          serial_number?: number | null
          mobile: string
          full_name: string
          date_of_birth?: string | null
          gender?: string | null
          email?: string | null
          permanent_address?: Json | null
          temporary_address?: Json | null
          delivery_pincode?: string | null
          nominees?: Json | null
          family_welfare?: string | null
          identity_proofs?: Json | null
          dream_box?: string | null
          dream_description?: string | null
          organizer_code?: string | null
          signature_path?: string | null
          selfie_path?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          membership_status?: string | null
          is_admin?: boolean | null
          created_at?: string | null
          activated_at?: string | null
        }
        Update: {
          id?: string
          vrk_id?: string
          serial_number?: number | null
          mobile?: string
          full_name?: string
          date_of_birth?: string | null
          gender?: string | null
          email?: string | null
          permanent_address?: Json | null
          temporary_address?: Json | null
          delivery_pincode?: string | null
          nominees?: Json | null
          family_welfare?: string | null
          identity_proofs?: Json | null
          dream_box?: string | null
          dream_description?: string | null
          organizer_code?: string | null
          signature_path?: string | null
          selfie_path?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          membership_status?: string | null
          is_admin?: boolean | null
          created_at?: string | null
          activated_at?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          member_id: string | null
          member_mobile: string
          member_name: string
          delivery_address: Json
          status: string | null
          payment_method: string | null
          payment_status: string | null
          subtotal: number
          delivery_fee: number | null
          total_amount: number
          notes: string | null
          delivery_agent: string | null
          created_at: string | null
          delivered_at: string | null
        }
        Insert: {
          id?: string
          order_number?: string
          member_id?: string | null
          member_mobile: string
          member_name: string
          delivery_address: Json
          status?: string | null
          payment_method?: string | null
          payment_status?: string | null
          subtotal: number
          delivery_fee?: number | null
          total_amount: number
          notes?: string | null
          delivery_agent?: string | null
          created_at?: string | null
          delivered_at?: string | null
        }
        Update: {
          id?: string
          order_number?: string
          member_id?: string | null
          member_mobile?: string
          member_name?: string
          delivery_address?: Json
          status?: string | null
          payment_method?: string | null
          payment_status?: string | null
          subtotal?: number
          delivery_fee?: number | null
          total_amount?: number
          notes?: string | null
          delivery_agent?: string | null
          created_at?: string | null
          delivered_at?: string | null
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: string | null
          product_name: string
          pack_size: string
          price: number
          quantity: number
          line_total: number
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          product_name: string
          pack_size: string
          price: number
          quantity?: number
          line_total: number
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          product_name?: string
          pack_size?: string
          price?: number
          quantity?: number
          line_total?: number
        }
      }
      otp_verifications: {
        Row: {
          id: string
          mobile: string
          otp_hash: string
          attempts: number | null
          expires_at: string
          verified: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          mobile: string
          otp_hash: string
          attempts?: number | null
          expires_at: string
          verified?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          mobile?: string
          otp_hash?: string
          attempts?: number | null
          expires_at?: string
          verified?: boolean | null
          created_at?: string | null
        }
      }
      rate_limits: {
        Row: {
          id: string
          identifier: string
          endpoint: string
          request_count: number | null
          window_start: string | null
        }
        Insert: {
          id?: string
          identifier: string
          endpoint: string
          request_count?: number | null
          window_start?: string | null
        }
        Update: {
          id?: string
          identifier?: string
          endpoint?: string
          request_count?: number | null
          window_start?: string | null
        }
      }
    }
  }
}
