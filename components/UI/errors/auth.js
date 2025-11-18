import { UNAUTHENTICATED_MSG, UNAUTHORIZED_MSG } from "@/lib/constants";

export const NotLoggedInComponent = () => (
  <div>
    <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
    <p className="text-xl mb-4">{UNAUTHENTICATED_MSG}</p>
    <button className="btn" onClick={() => signIn()}>
      Sign In
    </button>
  </div>
);

export const NotAuthorizedComponent = () => (
  <div>
    <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
    <p className="text-xl mb-4">{UNAUTHORIZED_MSG}</p>
  </div>
);
