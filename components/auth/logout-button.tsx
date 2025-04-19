
interface LogoutButtonProps {
    children: React.ReactNode,
}

export const LogoutButton = ({children}:LogoutButtonProps) => {
    const onClick = () => {
        
    }
    return ( 
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    );
}
 
