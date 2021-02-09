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
  const { loading, data } = useQuery(GET_USER, {
    variables: { username: navigation.getParam("username") }
  });
  const { data: { me } } = useQuery(ME)
  console.log(data.seeUser.state)
  console.log(`${data.seeUser.username} : ` + data.seeUser.state)
  console.log((data.seeUser.state === "2" && me.isFollowing))
  if (data.seeUser.username === me.username || data.seeUser.state === "1" || (data.seeUser.state === "2" && me.isFollowing)) {
    return (
      <ScrollView>
        {loading ? (
          <Loader />
        ) : (
            data && data.seeUser && <UserProfile {...data.seeUser} />
          )}
      </ScrollView>
    );
  } else {
    return (<ScrollView>
      {loading ? (
        <Loader />) : (<Text>비공개 계정입니다.</Text>)
      }
    </ScrollView>)
  }
};