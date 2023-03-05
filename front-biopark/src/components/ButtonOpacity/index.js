import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './style.css'

export default function ButtonOpacity({
    text,
    click,
    atributeColor,
    atributeSize,
    atributeLarge
}) {
    return (
        <Stack spacing={2} direction="row">
            <Button
                className={`
                ${atributeColor}
                ${atributeSize}
                ${atributeLarge}
                `}
                variant="contained"
                onClick={click}>
                {text}
            </Button>
        </Stack>
    );
}