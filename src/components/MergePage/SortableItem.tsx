import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface SortableItemProps {
  id: string
  name: string
  index: number
}

export function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="min-h-[2rem] flex rounded-md w-full"
    >
      <div className="p-1 bg-amber-500">{props.index}.</div>
      <div className="p-1 bg-amber-300">{props.name}</div>
    </li>
  )
}
