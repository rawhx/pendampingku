import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/navbar/Navbar";

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-white-light-hover">
            <Navbar isDashboard />

            <main className="flex-1">{children}</main>

            <Footer isLanding absoluteLinks />
        </div>
    );
}
