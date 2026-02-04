import React from 'react';

interface TextProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    as?: 'p' | 'span' | 'strong' | 'label';
}

const Text: React.FC<TextProps> = ({ children, style, as = 'p' }) => {
    const Element = as;
    return <Element style={style}>{children}</Element>;
};

export default Text;
