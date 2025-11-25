import { Trash } from "lucide-react";
import capitalize from "../utils/capitalize";

type Prority = 'low' | 'medium' | 'high' | 'done';
type Todo = {
    id: number,
    title: string,
    description: string,
    priority: Prority,
    done?: boolean
}

type Props = {
    todo: Todo,
    deleteTodo: () => void,
    isSelected?: boolean,
    toggleSelect?: (id: number) => void
}


function todoItem({ todo, deleteTodo, isSelected, toggleSelect }: Props) {
    return (

        <li className="p-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        aria-label={`Sélectionner la tâche ${todo.title}`}
                        className="checkbox checkbox-primary checkbox-sm"
                        disabled={todo.done === true}
                        checked={todo.done ? true : isSelected}
                        onChange={() => toggleSelect?.(todo.id)}
                    />

                    <h2 className={`text-l font-semibold ${todo.done === true ? 'line-through' : ''}`}>{capitalize(todo.title)}</h2>
                    <span
                        className={`badge badge-sm badge-soft
                         ${todo.priority === "low"
                                ? "badge-primary" :
                                todo.priority === "medium" ?
                                    'badge-warning' :
                                    'badge-error'}`}
                    >
                        {todo.priority}
                    </span>
                </div>
                <button
                    onClick={deleteTodo}
                    aria-label="Supprimer la tâche"
                    className="btn btn-sm btn-circle btn-error btn-soft">
                    <Trash
                        className="w-4 h-4 text-white"
                    />
                </button>
            </div>
            {/*   <div className="flex items-center gap-2">
                <span className="bage badge-primary">
                    {todo.priority}
                </span>
            </div>
            
            <p className="text-sm text-gray-500">Priority: {todo.priority}</p> */}
        </li>
    )
}

export default todoItem

{/* <li key={todo.id} className="p-4 bg-base-100 rounded-lg shadow">
                <h2 className="text-xl font-semibold">{todo.title}</h2>
                <p className="text-sm text-gray-500">Priority: {todo.priority}</p>
              </li> */}