import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import colors from '../Theme/colors';

const Todo = () => {
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

  const renderItem = ({item, drag, isActive}) => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          backgroundColor: isActive ? 'lightgrey' : 'white',
        }}
        onLongPress={drag}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            value={item.checked}
            onValueChange={() => toggleTodo(item.id)}
          />
          <Text
            style={[
              item.checked ? {textDecorationLine: 'line-through'} : {},
              {paddingLeft: 40},
            ]}>
            {item.name}
          </Text>
        </View>
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <Text style={{color: 'red', fontSize: 32}}>&#9746;</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const checkedCount = todos.filter(todo => todo.checked).length;
    setCounter(checkedCount);
  }, [todos]);

  return (
    <GestureHandlerRootView>
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

      <SafeAreaView style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingVertical: 10}}>
          Your To-Do List :
        </Text>
        {todos.length === 0 ? (
          <Text style={{fontSize: 20, color: 'black'}}>
            You don't have to do list...
          </Text>
        ) : (
          <DraggableFlatList
            data={todos}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onDragEnd={({data}) => setTodos(data)}
          />
        )}
      </SafeAreaView>

      <View style={{marginTop: 50, padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          Done : {counter}
        </Text>
      </View>
    </GestureHandlerRootView>
  );
};
export default Todo;
