import OAITest from "@/components/openai/openai_test";

export default async function Page() {
  const key = process.env.OPENAI_API_KEY;
  return (
    <div>
      {key}
      <OAITest />
    </div>
  );
}