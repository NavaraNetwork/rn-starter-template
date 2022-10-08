import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PlusCircleIcon} from 'react-native-heroicons/solid';
import {useSelector} from 'react-redux';
import {RootState} from '../data/store';
import {addBookmark, getFact} from '../data/store/actions';
import {IFact} from '../data/types';
import colors from '../configs/colors';
import {useAppDispatch} from '../hooks/redux';
import tw from '../libs/tailwind';
import toast from '../components/UI/Toast';

const Home = () => {
  const {facts, bookmarks} = useSelector(
    (state: RootState) => state.factsReducer,
  );
  const dispatch = useAppDispatch();

  const [listFacts, setListFacts] = useState<IFact[]>([]);

  const fetchFact = () => {
    dispatch(getFact());
  };

  const handlePress = (fact: IFact) => {
    dispatch(addBookmark(fact));
    toast.success('added');
  };

  useEffect(() => {
    fetchFact();
  }, []);

  useEffect(() => {
    setListFacts(prev => [...prev, facts].slice(-10));
  }, [facts]);

  return (
    <ScrollView
      style={tw`flex-1 w-full px-4 mt-10`}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={fetchFact} />
      }>
      <Text style={tw`text-3xl font-bold text-center text-primary`}>
        Random Cat Facts
      </Text>
      <Text style={tw`font-bold text-center text-gray-400`}>
        Pull down to get a new fact
      </Text>
      <View style={tw`flex-col-reverse flex-1`}>
        {listFacts &&
          listFacts.map((fact, index) => {
            const isBookmarked =
              bookmarks.findIndex(bookmark => bookmark.id === fact.id) !== -1;

            return (
              <View
                key={`${fact.id}-${index}`}
                style={tw`flex-row items-center justify-start w-full py-3`}>
                <TouchableOpacity
                  style={tw`w-8 h-8 p-1 rounded-full center 
                  ${isBookmarked ? 'opacity-40' : ''}`}
                  onPress={() => handlePress(fact)}
                  disabled={isBookmarked ? true : false}>
                  <PlusCircleIcon color={colors.primary} size={36} />
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

export default Home;
