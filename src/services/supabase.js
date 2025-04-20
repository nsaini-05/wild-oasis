import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://uwalutcirrhfkdawsmki.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3YWx1dGNpcnJoZmtkYXdzbWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDY3ODEsImV4cCI6MjA2MDU4Mjc4MX0.ed81p3_eBUr5YGMM4NpBulTR0ISAiZKvoBaFosGj7us";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
