// components/SortableList.tsx
import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Card from './Card'; // Import your Card component

interface SortableListProps {
  images: ImageData[]; // Replace ImageData with your image data type
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>; // Replace ImageData with your image data type
}

interface ImageData {
  img: string;
  title: string;
  id: number;
  tags: string[];
}

const SortableList: React.FC<SortableListProps> = ({ images, setImages }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((prevImages) => {
        const oldIndex = prevImages.findIndex(
          (image) => image.id === active.id
        );
        const newIndex = prevImages.findIndex(
          (image) => image.id === over.id
        );
        return arrayMove(prevImages, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={images} strategy={rectSortingStrategy}>
        {images.map((image) => (
          <Card key={image.id} id={image.id} src={image.img} title={image.title} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
