import TableSortLabel from '@mui/material/TableSortLabel';
import { styled } from '@mui/material/styles';

export const StyledSortLabel = styled(TableSortLabel)(({ theme }) => ({
    // Style for the text
    '&.MuiTableSortLabel-root': {
            color: theme.palette.common.white,
            '&:hover': {
            color: theme.palette.grey[300],
        },
        '&.Mui-active': {
            color: theme.palette.common.white,
        },
    },
    // Style for the sorting arrow icon
    '&.MuiTableSortLabel-root .MuiTableSortLabel-icon': {
        color: theme.palette.common.white,
    },
}));