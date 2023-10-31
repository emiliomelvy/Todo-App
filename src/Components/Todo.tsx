import React, {useState, useEffect} from 'react';
import {
  ScrollView,
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

  const addTodo = () => {
    setTodos(prevTodos => [
      ...prevTodos,
      {
        name: newTodo,
        checked: false,
      },
    ]);
    setNewTodo('');
  };

  const toggleTodo = index => {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].checked = !updatedTodos[index].checked;
      return updatedTodos;
    });
  };

  const deleteTodo = index => {
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  };

  useEffect(() => {
    const checkedCount = todos.filter(todo => todo.checked).length;
    setCounter(checkedCount);
  }, [todos]);

  return (
    <ScrollView>
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
        <View>
          {todos.length === 0 ? (
            <Text style={{fontSize: 20, color: 'black'}}>
              You don't have to do list...
            </Text>
          ) : (
            todos.map((todo, index) => {
              return (
                <View
                  key={index}
                  style={{
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox
                      value={todo.checked}
                      onValueChange={() => toggleTodo(index)}
                    />
                    <Text
                      style={[
                        todo.checked
                          ? {textDecorationLine: 'line-through'}
                          : {},
                        {paddingLeft: 40},
                      ]}>
                      {todo.name}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteTodo(index)}>
                    <Text style={{color: 'red', fontSize: 32}}>&#9746;</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </View>
      </SafeAreaView>

      <View style={{marginTop: 50, padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          Done : {counter}
        </Text>
      </View>
    </ScrollView>
  );
};
export default Todo;
