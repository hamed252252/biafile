import React from "react";
import HeroSection from "../componetns/HomePage/hero-section";
import ClassCard from "../componetns/class-cards/classCard";
import RssComponent from "../componetns/rss";
import UsefulLinks from "../componetns/usefull-links";
import NestedCardClasses from "../componetns/class-cards/nested-cards";

const Home: React.FC = () => {
    return (
        <div className="bg-background text-foreground">
            <HeroSection />
            <NestedCardClasses />
            <RssComponent />
            <UsefulLinks />
        </div>
    );
};

export default Home;
