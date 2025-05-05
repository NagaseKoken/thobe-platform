"use client";
import authClient from "@/lib/auth-cilent";

interface LogoutButtonProps {
	children?: React.ReactNode;
}
export const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = () => {
		authClient.signOut();
	};
	return (
		<span onClick={onClick} className="cursor-pointer ">
			{children}
		</span>
	);
};
