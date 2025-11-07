// components/dashboard/main.js
// Dashboard component that displays user and customer information and actions

export default function DashboardComponent({ user, customer }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Welcome, {user?.username}!</p>
    </div>
  );
}
