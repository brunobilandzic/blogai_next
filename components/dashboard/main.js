// components/dashboard/main.js
// Dashboard component that displays user and customer information and actions


export const DashboardComponent = ({ user, customer }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-xl mb-4">Hello, {user?.name || "User"}!</p>
      {customer && (
        <div className="mt-4 flex-col gap-2 p-4 border rounded bg-white shadow">
          <h2 className="text-2xl font-bold">Customer Information</h2>
          <p className="text-lg">Credits: {customer.credits}</p>
        </div>
      )}
    </div>
  );
};
