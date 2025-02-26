import DashboardNav from "../components/dashboard/nav";

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout = ({children}: AdminLayoutProps) => {
    return (
         <div className="flex flex-row gap-5">  
             <DashboardNav />
            <div className=" w-full">{children}</div>
         </div>
         );
}
 
export default AdminLayout;