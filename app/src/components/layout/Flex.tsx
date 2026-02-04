import React from 'react';
import Box from '../ui/Box';

interface FlexProps {
    children?: React.ReactNode;
    direction?: 'row' | 'column';
    align?: 'center' | 'flex-start' | 'flex-end' | 'stretch';
    justify?: 'center' | 'space-between' | 'flex-start' | 'flex-end';
    gap?: string;
    wrap?: 'wrap' | 'nowrap';
    style?: React.CSSProperties;
}

const Flex: React.FC<FlexProps> = ({
    children,
    direction = 'row',
    align = 'center',
    justify = 'flex-start',
    gap = '0.5rem',
    wrap = 'nowrap',
    style
}) => {
    return (
        <Box style={{
            display: 'flex',
            flexDirection: direction,
            alignItems: align,
            justifyContent: justify,
            gap,
            flexWrap: wrap,
            ...style
        }}>
            {children}
        </Box>
    );
};

export default Flex;
