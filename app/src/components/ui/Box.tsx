import React from 'react';

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: () => void;
    as?: 'div' | 'form' | 'header' | 'footer' | 'nav' | 'section' | 'a';
    onSubmit?: (e: React.FormEvent) => void;
    href?: string;
}

const Box: React.FC<BoxProps> = ({ children, style, onClick, onSubmit, as = 'div', href, ...props }) => {
    const Tag = as;
    return <Tag style={style} onClick={onClick} onSubmit={onSubmit} href={href as any} {...props}>{children}</Tag>;
};

export default Box;
