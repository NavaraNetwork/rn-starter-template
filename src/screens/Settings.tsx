import React from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MinusCircleIcon, PlusCircleIcon} from 'react-native-heroicons/solid';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../data/store';
import {removeBookmark} from '../data/store/actions';
import {IFact} from '../data/types';
import colors from '../configs/colors';
import {useAppDispatch} from '../hooks/redux';
import tw from '../libs/tailwind';

const Settings = () => {
  const {bookmarks} = useSelector((state: RootState) => state.factsReducer);
  const dispatch = useAppDispatch();

  const handlePress = (fact: IFact) => {
    dispatch(removeBookmark(fact));
  };

  return (
    <ScrollView style={tw`flex-1 w-full px-4 mt-10`}>
      <Text style={tw`py-3 text-3xl font-bold text-center text-primary`}>
        Bookmarked Facts
      </Text>
      <View style={tw`flex-col-reverse flex-1`}>
        {bookmarks &&
          bookmarks.map(fact => {
            return (
              <View
                key={fact.id}
                style={tw`flex-row items-center justify-start w-full py-3`}>
                <TouchableOpacity
                  style={tw`w-8 h-8 p-1 rounded-full center`}
                  onPress={() => handlePress(fact)}>
                  <MinusCircleIcon color={'red'} size={25} />
                </TouchableOpacity>
                <Text style={tw`pl-1 font-semibold text-gray-500`}>
                  {fact.fact}
                </Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default Settings;
