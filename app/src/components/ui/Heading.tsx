import React from 'react';

interface HeadingProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: React.FC<HeadingProps> = ({ children, style, level = 2 }) => {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    return <Tag style={style}>{children}</Tag>;
};

export default Heading;
