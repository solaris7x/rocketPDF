import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers"

import { SortableItem } from "./SortableItem"
interface DropListProps {
  items: dragItemType[]
  setInputFiles: React.Dispatch<React.SetStateAction<dragItemType[]>>
}

export interface dragItemType {
  id: string
  file: File
}

const DropList = (props: DropListProps) => {
  // const [items, setItems] = useState(getItems(5))

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id === over?.id || !over) {
      return
    }

    if (active.id !== over.id) {
      props.setInputFiles((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  // dnd-core magic
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <ul className="flex flex-col gap-2 text-black w-full overflow-x-auto">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        // onDragEnd={(event) => {
        //   console.log(event)
        // }}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={props.items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {props.items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              name={item.file.name}
              index={index + 1}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  )
}
export default DropList
