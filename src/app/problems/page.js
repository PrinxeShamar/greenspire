import { createClient } from "@supabase/supabase-js";
import View from "./view";

export default async function Page() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let problems = (
    await supabase.from("test").select().order("id", { ascending: true })
  )["data"];

  return <View problems={problems} />;
}
