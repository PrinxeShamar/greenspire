import { createClient } from "@supabase/supabase-js";
import View from "./view";

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let problem = (await supabase.from("test").select().eq("id", params.id))[
    "data"
  ][0];

  return <View problem={problem} />;
}
