import { useAuth } from "contexts/auth-context";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect } from "react";
import PageNotFound from "./PageNotFound";

const DashboardPage = () => {
  const { userInfo } = useAuth();
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  if (userInfo.role !== 1) return <PageNotFound></PageNotFound>;
  return (
    <div>
      <DashboardHeading
        title="Dashboard"
        desc="Overview dashboard monitor"
      ></DashboardHeading>
    </div>
  );
};

export default DashboardPage;
