import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import ChapterCard from "./components/ChapterCard";
import useReOrderChapter from "../../../../../api/useReOrderChapter";
import { LoadingButton } from "@mui/lab";

const ChapterRenderer = ({ chapters }) => {
  const [draggingItem, setDraggingItem] = useState(null);
  const [data, setData] = useState(chapters);
  const [hoveredItem, setHoveredItem] = useState(null);
  const reOrderChapter = useReOrderChapter();
  const handleSaveSort = () => {
    reOrderChapter.mutate({
      chapters: data.map((cha, i) => {
        return {
          id: cha.id,
          sort: i,
        };
      }),
    });
  };

  const handleDragStart = (e, item) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e, item) => {
    e.preventDefault();
    setHoveredItem(item);
  };

  const handleDrop = (e, targetItem) => {
    if (!draggingItem) return;

    const currentIndex = data.indexOf(draggingItem);
    const targetIndex = data.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      data.splice(currentIndex, 1);
      data.splice(targetIndex, 0, draggingItem);
      setData(data);
    }
    setHoveredItem(null);
  };
  return (
    <Box>
      <LoadingButton loading={reOrderChapter.isPending} loadingPosition="start" variant="outlined" onClick={handleSaveSort}>
        Save New Sort
      </LoadingButton>
      {data?.map((chapter) => {
        return (
          <Box
            key={chapter.id}
            sx={{
              mt: 2,
              cursor: "grab",
              opacity: chapter === draggingItem ? "0.8" : "1",
              border: chapter === hoveredItem ? "1px dashed red" : "none",
              borderRadius: "12px",
            }}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, chapter)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, chapter)}
            onDrop={(e) => handleDrop(e, chapter)}
          >
            <ChapterCard chapter={chapter} />
          </Box>
        );
      })}
    </Box>
  );
};

export default ChapterRenderer;
