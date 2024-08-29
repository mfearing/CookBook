import { CookBookProvider } from "../../context/cookbook";
import CookBookLayout from "./components/CookBookLayout";

export default function CookBookPage() {

    return (
        <CookBookProvider>
            <CookBookLayout />
        </CookBookProvider>
    );
}