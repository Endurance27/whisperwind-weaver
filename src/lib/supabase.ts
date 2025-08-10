import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          surname: string
          othername: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          surname: string
          othername: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          surname?: string
          othername?: string
          created_at?: string
          updated_at?: string
        }
      }
      analytics_data: {
        Row: {
          id: string
          content: string
          category: 'mental_health' | 'vaw' | 'lgbtq' | 'pwds'
          sentiment: 'positive' | 'negative' | 'neutral'
          confidence_score: number
          source: string
          created_at: string
          processed_at: string
        }
        Insert: {
          id?: string
          content: string
          category: 'mental_health' | 'vaw' | 'lgbtq' | 'pwds'
          sentiment: 'positive' | 'negative' | 'neutral'
          confidence_score: number
          source: string
          created_at?: string
          processed_at?: string
        }
        Update: {
          id?: string
          content?: string
          category?: 'mental_health' | 'vaw' | 'lgbtq' | 'pwds'
          sentiment?: 'positive' | 'negative' | 'neutral'
          confidence_score?: number
          source?: string
          created_at?: string
          processed_at?: string
        }
      }
    }
    Enums: {
      content_category: 'mental_health' | 'vaw' | 'lgbtq' | 'pwds'
      sentiment_type: 'positive' | 'negative' | 'neutral'
    }
  }
}