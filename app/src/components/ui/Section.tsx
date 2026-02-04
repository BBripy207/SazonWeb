import React from 'react';

interface SectionProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const Section: React.FC<SectionProps> = ({ children, style }) => {
    return <section style={style}>{children}</section>;
};

export default Section;
