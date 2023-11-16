import React from "react";
import Navbar from "./Navbar";
import api from "@/services/api";

const NavWrapper = async () => {
    const { data } = await api.navigations.findMany();
    return <Navbar navData={data} />;
};

export default NavWrapper;
