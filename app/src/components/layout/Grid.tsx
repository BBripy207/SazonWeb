import React from 'react';
import Box from '../ui/Box';

interface GridProps {
    children?: React.ReactNode;
    columns?: 'recipes' | 'categories' | 'contacts' | 'form';
    gap?: string;
    style?: React.CSSProperties;
}

const Grid: React.FC<GridProps> = ({ children, columns = 'recipes', gap, style }) => {
    const gridStyles: Record<string, string> = {
        recipes: 'repeat(auto-fill, minmax(280px, 1fr))',
        categories: 'repeat(auto-fit, minmax(150px, 1fr))',
        contacts: 'repeat(auto-fit, minmax(250px, 1fr))',
        form: 'repeat(auto-fit, minmax(150px, 1fr))',
    };

    return (
        <Box style={{
            display: 'grid',
            gridTemplateColumns: gridStyles[columns],
            gap: gap || '1.5rem',
            ...style
        }}>
            {children}
        </Box>
    );
};

export default Grid;
