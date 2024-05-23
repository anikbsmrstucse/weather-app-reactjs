import Header from "./components/Header/Header";
import Weatherboard from "./components/Weatherboard/Weatherboard";

export default function App() {
    return (
        <div className="grid place-items-center h-screen">
            <Header />
            <main>
                <section className="py-20">
                    <Weatherboard />
                </section>
            </main>
        </div>
    );
}
