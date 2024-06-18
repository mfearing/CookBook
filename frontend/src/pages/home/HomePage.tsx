import { AuthContextType } from "../../context/auth";
import useAuthContext from "../../hooks/use-auth-context";


export default function HomePage(){
    const {userLogin} = useAuthContext() as AuthContextType;

    //TODO: use Typography from Material UI instead of <h3>

    let content;
    if(!userLogin){
        content = (<div>
            <h3>Cook Book Home Page!</h3>
        </div>);
    } else {
        content = (<div>
                <h3>Welcome {userLogin.firstName}</h3>
            </div>);
    }

    return (
        <div>{content}</div>
    );
}