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
}

function priorityItem({ todo }: Props) {
    return (
        <>
            <span
            
                className={`badge badge-sm badge-soft
                         ${todo.priority === "low"
                        ? "badge-primary" :
                        todo.priority === "medium" ?
                            'badge-warning' :
                            'badge-error'}`}
                            
            >
                {capitalize(todo.priority)}
            </span>
        </>
    )
}

export default priorityItem
