import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lovable.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // This will be automatically injected by Lovable

export const supabase = createClient(supabaseUrl, supabaseKey);