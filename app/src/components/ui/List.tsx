import React from 'react';

interface ListProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    ordered?: boolean;
}

const List: React.FC<ListProps> = ({ children, style, ordered = false }) => {
    const Element = ordered ? 'ol' : 'ul';
    return <Element style={style}>{children}</Element>;
};

export default List;
