"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableRow, TableCell } from "@/components/ui/table";
import { GripHorizontal } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROUTES } from "@/lib/routes-config";
import { BannerListResponse } from "@/app/(private)/banner/_action/type";

type Banner = BannerListResponse[0];

export function SortableRow({ banner }: { banner: Banner }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: banner.bannerId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow
      url={`${ROUTES.BANNER}/${banner.bannerId}`}
      ref={setNodeRef}
      style={{ ...style, touchAction: "manipulation" }}
      {...attributes}
    >
      <TableCell
        className="text-center align-middle  cursor-grab active:cursor-grabbing touch-none select-none"
        {...listeners}
        style={{ touchAction: "none" }}
      >
        <div className="flex items-center justify-center">
          <GripHorizontal className="w-4 h-4 text-gray-500" />
        </div>
      </TableCell>
      <TableCell>
        <Tooltip delayDuration={600}>
          <TooltipTrigger asChild>
            <div className="w-12 h-8 rounded-sm flex items-center justify-center overflow-hidden cursor-pointer">
              <Image
                src={banner.bannerImageUrl}
                alt={banner.title}
                width={48}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-2" side="top" sideOffset={10}>
            <div className="relative">
              <Image
                src={banner.bannerImageUrl}
                alt={banner.title}
                width={200}
                height={150}
                className="object-cover rounded-md"
              />
            </div>
          </TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell className="font-medium">{banner.title}</TableCell>
      <TableCell className="max-w-[200px]">
        <div className="truncate">{banner.linkUrl}</div>
      </TableCell>
      <TableCell>{banner.createDt}</TableCell>
      <TableCell>{banner.lastUpdateDt}</TableCell>
      <TableCell className="text-right align-middle"></TableCell>
    </TableRow>
  );
}
