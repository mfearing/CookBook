import { Card, CardContent, CardHeader, Typography } from "@mui/material";

export interface InstructionsCardProps {
    instructions: string
}

export default function InstructionsCard({instructions}: InstructionsCardProps) {

    return (
        <Card>
            <CardHeader
                title="Instructions"
            />
            <CardContent>
                <Typography>{instructions}</Typography>
            </CardContent>
        </Card>
    );
}