import Link from "next/link";

export default function AgentTest() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Agent Page</h1>
      <p className="text-xl mb-4">
        This is the agent page where you can manage your agent.
      </p>
      <Link href="/agent/test" className="text-blue-500 underline">
        Go to Agent Test Page
      </Link>
    </div>
  );
}
