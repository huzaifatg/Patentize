/* eslint-disable prettier/prettier */
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
      patents: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          total_shares: number
          available_shares: number
          owner_id: string
          category: string
          image_url: string | null
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          total_shares: number
          available_shares: number
          owner_id: string
          category: string
          image_url?: string | null
          created_at?: string
          expires_at: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          total_shares?: number
          available_shares?: number
          owner_id?: string
          category?: string
          image_url?: string | null
          created_at?: string
          expires_at?: string
        }
      }
      patent_transactions: {
        Row: {
          id: string
          patent_id: string
          buyer_id: string
          shares_purchased: number
          price_per_share: number
          total_amount: number
          created_at: string
        }
        Insert: {
          id?: string
          patent_id: string
          buyer_id: string
          shares_purchased: number
          price_per_share: number
          total_amount: number
          created_at?: string
        }
        Update: {
          id?: string
          patent_id?: string
          buyer_id?: string
          shares_purchased?: number
          price_per_share?: number
          total_amount?: number
          created_at?: string
        }
      }
    }
  }
}
