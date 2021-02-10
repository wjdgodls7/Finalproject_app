import React from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../Fragments";
import Loader from "../components/Loader";
import { ScrollView, Text } from "react-native";
import UserProfile from "../components/UserProfile";
import { ME } from "./tabs/Profile";

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: { username: navigation.getParam("username") }
  });
  refetch()
  console.log(data.seeUser.state)
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
          data && data.seeUser && <UserProfile {...data.seeUser} />
        )}
    </ScrollView>
  );

};