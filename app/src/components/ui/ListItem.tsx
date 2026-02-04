import React from 'react';

interface ListItemProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const ListItem: React.FC<ListItemProps> = ({ children, style }) => {
    return <li style={style}>{children}</li>;
};

export default ListItem;
