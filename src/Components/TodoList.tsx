import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DraggableFlatList from 'react-native-draggable-flatlist';

const TodoList = ({todos, toggleTodo, deleteTodo, setTodos}) => {
  return (
    <View>
      {todos.length === 0 ? (
        <Text style={{fontSize: 20, color: 'black'}}>
          You don't have a to-do list...
        </Text>
      ) : (
        <DraggableFlatList
          data={todos}
          renderItem={({item, drag, isActive}) => (
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
          )}
          keyExtractor={item => item.id}
          onDragEnd={({data}) => setTodos(data)}
        />
      )}
    </View>
  );
};

export default TodoList;
