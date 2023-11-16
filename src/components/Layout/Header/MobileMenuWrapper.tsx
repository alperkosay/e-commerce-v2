import React from "react";
import MobileMenu from "./MobileMenu";
import api from "@/services/api";

const MobileMenuWrapper = async () => {
    const { data } = await api.navigations.findMany();
    return <MobileMenu navData={data} />;
};

export default MobileMenuWrapper;
