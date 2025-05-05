import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

const authClient = createAuthClient({
	plugins: [adminClient()],
});

export default authClient;
