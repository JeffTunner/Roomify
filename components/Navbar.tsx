import {Box} from "lucide-react";
import Button from "./ui/Button";
import {useOutletContext} from "react-router";

function Navbar() {
    const {isSignedIn, username, signIn, signOut } = useOutletContext<AuthContext>()

    async function handleAuthClick() {
        if(isSignedIn) {
            try {
                await signOut();
            } catch (e){
                console.log(`Puter signout error: ${e}`);
            }
            return;
        }

        try {
            await signIn();
        } catch (e) {
            console.log(`Puter signin error: ${e}`);
        }
    }

    return (
        <header className="navbar">
            <nav className="inner">
                <div className="left">
                    <div className="brand">
                        <Box className="logo" />

                        <span className="name">
                            Roomify
                        </span>
                    </div>

                    <ul className="links">
                        <a href="#">Product</a>
                        <a href="#">Pricing</a>
                        <a href="#">Community</a>
                        <a href="#">Enterprise</a>
                    </ul>
                </div>

                <div className="actions">
                    {isSignedIn ? (
                        <>
                            <span className="greeting">
                                {username ? `Hi, ${username}` : 'Signed in'}
                            </span>

                            <Button size="sm" onClick={handleAuthClick} className="btn">
                                Log Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="sm"
                                onClick={handleAuthClick}
                                variant="ghost">
                                Log In
                            </Button>

                            <a href="#upload"
                               className="cta">
                                Get Started
                            </a>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;