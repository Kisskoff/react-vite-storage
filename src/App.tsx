import { useEffect, useState } from "react";
import TodoItem from "./components/todoItem";
import { Trash } from 'lucide-react';

type Prority = 'low' | 'medium' | 'high';
type Todo = {
  id: number,
  title: string,
  description: string,
  priority: Prority,
  done?: boolean
}



function App() {

  const [inputTitle, setInputTitle] = useState('');
  // const [inputDescription, setInputDescription] = useState('');
  const [inputPriority, setInputPriority] = useState<Prority>('low');
  const [filter, setFilter] = useState<Prority | 'all'>('all');
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const fromStorage = localStorage.getItem('todos');
      return fromStorage ? JSON.parse(fromStorage) : [];
    } catch (e) {
      console.error('Error reading todos from localStorage', e);
      return [];
    }
  });

  //
  const [selectedTods, setSelectedTodos] = useState<Set<number>>(new Set());

  // save todos to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (e) {
      console.error('Error saving todos to localStorage', e);
    }
  }, [todos]);

  function addTodo() {
    if (inputTitle.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: inputTitle.trim(),
      description: '',
      priority: inputPriority
    };


    setTodos([newTodo, ...todos]);
    setInputTitle('');
    //setInputDescription('');
    setInputPriority('low');

    console.info('Adding todo:', [newTodo, ...todos]);
  }

  let filteredTodos: Todo[] = todos;
  //
  if (filter !== 'all') {
    filteredTodos = todos.filter(todo => todo.priority === filter);
  }

  // count
  // const count = todos.length;
  const count = filteredTodos.length;

  const allTodos = todos.length;
  const lowTodos = todos.filter(todo => todo.priority === 'low').length;
  const mediumTodos = todos.filter(todo => todo.priority === 'medium').length;
  const highTodos = todos.filter(todo => todo.priority === 'high').length;

  ///
  // delete todo function
  function deleteTodo(id: number) {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  }

  // select todo function
  function toggleSelectTodo(id: number) {
    const newSelectedTodos = new Set(selectedTods);
    if (newSelectedTodos.has(id)) {
      newSelectedTodos.delete(id);
    } else {
      newSelectedTodos.add(id);
    }
    setSelectedTodos(newSelectedTodos);
  }
  // delete all  selected todos
  function delAllSelectedTodos() {
    const updatedTodos = todos.filter(todo => !selectedTods.has(todo.id));
    setTodos(updatedTodos);
    setSelectedTodos(new Set());
  }

  /// met 
  // add selected to done
  function addSelectedToDone() {
    const updatedTodos = todos.map(todo => {
      if (selectedTods.has(todo.id)) {
        return { ...todo, done: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setSelectedTodos(new Set());
  }

  ////

  return (
    <div className="flex justify-center">
      {/* <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-200 p-5 rounded-2xl"> */}
      <div
        className="
        w-full           /* Mobile : largeur 100% */
        md:w-2/3         /* Desktop : 2/3 de l'écran */
        flex flex-col gap-4 my-15 md:bg-base-200 p-5 
        rounded-none     /* Mobile : pas d'arrondi */
        md:rounded-2xl   /* Desktop : arrondi */
      "
      >
        <h1 className="text-3xl font-bold mb-2">
          TODO APP {count > 0 ? `(${count})` : ''}
        </h1>
       
        <div className="flex flex-col gap-2 md:flex-row md:gap-4 w-full">

          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une nouvelle tâche"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />

          <select
            aria-label="Priorité"
            className="select w-full md:w-auto"
            value={inputPriority}
            onChange={(e) => setInputPriority(e.target.value as Prority)}
          >
            <option disabled value="">Priorité</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            type="button"
            className="btn btn-primary w-full md:w-auto"
            onClick={addTodo}
          >
            Ajouter
          </button>

        </div>

        {filteredTodos.length > 0 ?
          <div className="space-y-2 flex flex-1 hit-fit">
            <div className="flex flex-col md:flex-row items-start justify-between w-full gap-4 md:gap-0 ">
              <div className="flex flex-wrap gap-4">
                <button className={`btn btn-soft ${filter === 'all' ? 'btn-primary' : ''}`} onClick={() => setFilter('all')}>Tous {allTodos > 0 ? `(${allTodos})` : ''}</button>
                <button className={`btn btn-soft ${filter === 'low' ? 'btn-primary' : ''}`} onClick={() => setFilter('low')}>Low {lowTodos > 0 ? `(${lowTodos})` : ''}</button>
                <button className={`btn btn-soft ${filter === 'medium' ? 'btn-primary' : ''}`} onClick={() => setFilter('medium')}>Medium {mediumTodos > 0 ? `(${mediumTodos})` : ''}</button>
                <button className={`btn btn-soft ${filter === 'high' ? 'btn-primary' : ''}`} onClick={() => setFilter('high')}>High {highTodos > 0 ? `(${highTodos})` : ''}</button>
              </div>
              {selectedTods.size > 0 ?
                <button
                  onClick={addSelectedToDone} className="btn btn-primary w-full md:w-auto">
                  Terminer la sélection ({selectedTods.size})
                </button>
                : null}
            </div>
            {/* <div className="flex flex-col md:flex-row bg-white">
              <select
                aria-label="filter"
                className="select w-full md:w-auto"
              >
                 <option className={`btn btn-soft ${filter === 'all' ? 'btn-primary' : ''}`} onClick={() => setFilter('all')}>Tous {allTodos > 0 ? `(${allTodos})` : ''}</button>
                <option className={`btn btn-soft ${filter === 'low' ? 'btn-primary' : ''}`} onClick={() => setFilter('low')}>Low {lowTodos > 0 ? `(${lowTodos})` : ''}</button>
                <option className={`btn btn-soft ${filter === 'medium' ? 'btn-primary' : ''}`} onClick={() => setFilter('medium')}>Medium {mediumTodos > 0 ? `(${mediumTodos})` : ''}</button>
                <option className={`btn btn-soft ${filter === 'high' ? 'btn-primary' : ''}`} onClick={() => setFilter('high')}>High {highTodos > 0 ? `(${highTodos})` : ''}</button>
          

              </select>

            </div> */}
          </div> : null
        }
        {filteredTodos.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row justify-between p-3 bg-base-100 rounded-t-xl shadow gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Liste des tâches</h2>
                <span className="badge badge-neutral badge-primary badge-sm">{count}</span>
              </div>
              <button
                className="btn btn-error"
                disabled={selectedTods.size === 0}
                onClick={delAllSelectedTodos}
              >
                Supprimer la sélection  {(selectedTods.size > 0) ? (selectedTods.size) : ''}
              </button>
            </div>
            <ul className="bg-base-100 rounded-xl shadow space-y-2">

              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  isSelected={selectedTods.has(todo.id)}
                  deleteTodo={() => deleteTodo(todo.id)}
                  toggleSelect={toggleSelectTodo}
                />
              ))}
            </ul>
          </>
        ) : (
          <div className="flex flex-col h-full justify-center items-center p-10 gap-4">
            <Trash className="w-30 h-30 text-gray-400 mx-auto" />
            <p className="text-center text-gray-500">No todos to display.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
