import React from "react";
import { List, Divider } from "@mui/material";
import type { Highlight } from "../types/highlight";
import { HighlightItem } from "./HighlightItem";

interface HighlightListProps {
  highlights: Highlight[];
  onDelete: (id: string) => void;
}

export const HighlightList: React.FC<HighlightListProps> = ({
  highlights,
  onDelete,
}) => {
  return (
    <List sx={{ overflow: "auto", flex: 1 }}>
      {highlights.map((highlight, index) => (
        <React.Fragment key={highlight.id}>
          <HighlightItem highlight={highlight} onDelete={onDelete} />
          {index < highlights.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};
