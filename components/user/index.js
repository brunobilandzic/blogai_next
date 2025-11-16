export default function ProfilePage({ appUser }) {
  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {appUser?.username}</p>
      <p>Email: {appUser?.email}</p>
    </div>
  );
}
