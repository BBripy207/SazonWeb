import React from 'react';

interface TextProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    as?: 'p' | 'span' | 'strong' | 'label';
    onClick?: (e: React.MouseEvent) => void;
}

const Text: React.FC<TextProps> = ({ children, style, as = 'p', onClick }) => {
    const Element = as;
    return <Element style={{ ...style, cursor: onClick ? 'pointer' : style?.cursor }} onClick={onClick}> {children} </Element>;
};

export default Text;
