import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, TextInput, Button} from 'react-native';
import colors from './src/Theme/colors';
import TodoList from './src/Components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [counter, setCounter] = useState(0);
  const [idCounter, setIdCounter] = useState(1);

  const addTodo = () => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: idCounter,
        name: newTodo,
        checked: false,
      },
    ]);
    setNewTodo('');
    setIdCounter(idCounter + 1);
  };

  const toggleTodo = id => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, checked: !todo.checked};
        }
        return todo;
      });
      return updatedTodos;
    });
  };

  const deleteTodo = id => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id);
    });
  };

  useEffect(() => {
    const checkedCount = todos.filter(todo => todo.checked).length;
    setCounter(checkedCount);
  }, [todos]);

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: colors.purple,
          paddingHorizontal: 10,
          paddingVertical: 30,
        }}>
        <View>
          <Text style={{fontSize: 32, color: colors.white, fontWeight: 'bold'}}>
            Hello User
          </Text>
          <Text style={{color: colors.white, paddingTop: 5}}>
            What are you going to do?
          </Text>
        </View>
        <View
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <TextInput
            value={newTodo}
            onChangeText={text => setNewTodo(text)}
            style={{borderWidth: 1, borderRadius: 10, padding: 10, flex: 3}}
            placeholder="Add To Do"></TextInput>
          <View style={{flex: 1}}>
            <Button title="Add" onPress={addTodo}></Button>
          </View>
        </View>
      </SafeAreaView>

      <GestureHandlerRootView>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 10}}>
            Your To-Do List :
          </Text>
          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            setTodos={setTodos}
          />
        </View>
      </GestureHandlerRootView>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          Done : {counter}
        </Text>
      </View>
    </>
  );
};
export default App;
