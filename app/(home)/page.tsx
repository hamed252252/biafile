import React from 'react';
import HeroSection from '../componetns/HomePage/hero-section';
import RssComponent from '../componetns/rss';
import UsefulLinks from '../componetns/usefull-links';
import NestedCardClasses from '../componetns/class-cards/nested-cards';
import MovingLine from '@/components/ui/moving-line';

const Home: React.FC = () => {
  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <MovingLine>
        <NestedCardClasses />
      </MovingLine>
      <RssComponent />
      <UsefulLinks />
    </div>
  );
};

export default Home;
