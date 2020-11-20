import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MatchingDetailScreen from './src/screens/MatchingDetailScreen.js';
import MyPageScreen from './src/screens/MyPageScreen';
import MatchingListScreen from './src/screens/MatchingListScreen';
import MatchingCreateScreen from './src/screens/MatchingCreateScreen';
import EditMyInformation from './src/screens/EditMyInformation';
import EditTeamInformation from "./src/screens/EditTeamInformation";
import TeamDetailScreen from "./src/screens/TeamDetailScreen";
import TeamCreateScreen from "./src/screens/TeamCreateScreen";
import BoardCreateScreen from "./src/screens/BoardCreateScreen";
import BoardDetailScreen from "./src/screens/BoardDetailScreen";
import TeamListScreen from "./src/screens/TeamListScreen";
import BoardListScreen from "./src/screens/BoardListScreen";
import TeamMemberScreen from "./src/screens/TeamMemberScreen";
import MatchingModifyScreen from './src/screens/MatchingModifyScreen';
import MatchingRequestScreen from './src/screens/MatchingRequestScreen';
import FindEmailScreen from "./src/screens/FindEmailScreen";
import FindPwScreen from "./src/screens/FindPwScreen";
import CreateNewPwScreen from "./src/screens/CreateNewPwScreen";


const Stack = createStackNavigator();
export const AuthContext = React.createContext();

export default App = () => {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {

      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []

  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.userToken == null ?
            (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="FindEmail" component={FindEmailScreen} />
                <Stack.Screen name="FindPw" component={FindPwScreen} />
                <Stack.Screen name="CreateNewPw" component={CreateNewPwScreen} />
              </>
            ) :
            (
              <>
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="MatchingDetail" component={MatchingDetailScreen} />
                <Stack.Screen name="MyPage" component={MyPageScreen} />
                <Stack.Screen name="MatchingList" component={MatchingListScreen} />
                <Stack.Screen name="MatchingCreate" component={MatchingCreateScreen} />
                <Stack.Screen name="EditMyInformation" component={EditMyInformation} />
                <Stack.Screen name="EditTeamInformation" component={EditTeamInformation} />
                <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
                <Stack.Screen name="BoardDetail" component={BoardDetailScreen} />
                <Stack.Screen name="TeamList" component={TeamListScreen} />
                <Stack.Screen name="BoardList" component={BoardListScreen} />
                <Stack.Screen name="TeamMember" component={TeamMemberScreen} />
                <Stack.Screen name="TeamCreate" component={TeamCreateScreen} />
                <Stack.Screen name="BoardCreate" component={BoardCreateScreen} />
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="MatchingModify" component={MatchingModifyScreen} />
                <Stack.Screen name="MatchingRequest" component={MatchingRequestScreen} />
              </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
