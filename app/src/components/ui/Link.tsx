import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
    to: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const Link: React.FC<LinkProps> = ({ to, children, style }) => {
    return <RouterLink to={to} style={style}>{children}</RouterLink>;
};

export default Link;
