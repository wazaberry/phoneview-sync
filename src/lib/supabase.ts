import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Use the correct Supabase URL and key from the auto-generated client
export const supabase = createClient<Database>(
  'https://bcrprbtaxtfmjfbhsahc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjcnByYnRheHRmbWpmYmhzYWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1NTA0OTIsImV4cCI6MjA1MTEyNjQ5Mn0.8Jmn5wRgO5Z5BC0St7AnqSM_xdYLOowMXLtVPewvnxg'
);