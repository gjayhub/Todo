import React, { useState } from "react";
import {
  IonApp,
  IonCard,
  IonIcon,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonInput,
} from "@ionic/react";
import { checkmarkOutline, trashOutline, radioButtonOn } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

interface Todo {
  text: string;
  checked: boolean;
  id: string;
}
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const generateUniqueId = (): string => {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newId = generateUniqueId();
      setTodos((prevTodos) => [
        { id: newId, text: newTodo, checked: false },
        ...prevTodos,
      ]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const checkTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <IonApp className="main">
      <IonHeader>
        <IonToolbar className="header">
          <IonTitle className="ion-text-center">Todo App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonGrid>
            <IonRow>
              <IonCol size="9">
                <IonInput
                  placeholder="Write your todo"
                  value={newTodo}
                  onIonChange={(e) => setNewTodo(e.detail.value!)}
                ></IonInput>
              </IonCol>
              <IonCol size="1">
                <IonButton onClick={addTodo}>Add</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
        <IonCard>
          {todos.map((todo, index) => (
            <IonGrid key={index}>
              <IonRow
                onClick={() => checkTodo(todo.id)}
                className={`row ion-align-items-center ion-padding-end `}
              >
                <IonCol size="1">
                  <IonIcon
                    icon={todo.checked ? checkmarkOutline : radioButtonOn}
                    className="check"
                  ></IonIcon>
                </IonCol>
                <IonCol>
                  <p className={`text ${todo.checked && "underline"}`}>
                    {todo.text}
                  </p>
                </IonCol>
                <IonCol size="1">
                  <IonIcon
                    className="delete"
                    icon={trashOutline}
                    size="large"
                    onClick={() => deleteTodo(todo.id)}
                  ></IonIcon>
                </IonCol>
              </IonRow>
            </IonGrid>
          ))}
        </IonCard>
      </IonContent>
    </IonApp>
  );
};

export default App;
