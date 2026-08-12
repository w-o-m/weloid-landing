export type CaseInsert = {
  case_type: string;
  statement: string;
  name: string;
  email: string;
  evidence_note?: string | null;
};

export type CaseRow = CaseInsert & { id: string; created_at: string };

export type Database = {
  public: {
    Tables: {
      cases: {
        Row: CaseRow;
        Insert: CaseInsert;
        Update: Partial<CaseInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
