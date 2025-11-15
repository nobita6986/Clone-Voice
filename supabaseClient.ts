import { createClient } from '@supabase/supabase-js'

// TODO: Thay thế các giá trị này bằng thông tin đăng nhập từ dự án Supabase của bạn.
// Bạn có thể tìm thấy chúng trong phần Settings > API trong bảng điều khiển Supabase của bạn.
const supabaseUrl = 'https://ghsczvjccuxefuftagjx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdoc2N6dmpjY3V4ZWZ1ZnRhZ2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxODIyNjEsImV4cCI6MjA3ODc1ODI2MX0.6AYTcz7NPDpJubIU_qaLuIlzvij2RUlbd24mhoybnGE';

// FIX: This comparison was removed as it caused a TypeScript error. Since `supabaseUrl`
// is a constant with a hardcoded value, it can never be equal to 'YOUR_SUPABASE_URL'.
if (!supabaseUrl) {
    console.warn("Cảnh báo: URL Supabase chưa được định cấu hình. Vui lòng cập nhật tệp supabaseClient.ts.");
}

// FIX: This comparison was removed as it caused a TypeScript error. Since `supabaseAnonKey`
// is a constant with a hardcoded value, it can never be equal to 'YOUR_SUPABASE_ANON_KEY'.
if (!supabaseAnonKey) {
    console.warn("Cảnh báo: Khóa anon của Supabase chưa được định cấu hình. Vui lòng cập nhật tệp supabaseClient.ts.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);