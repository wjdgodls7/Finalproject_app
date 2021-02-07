import React from "react";
import { Text } from "react-native";
import SearchBar from "../../../components/SearchBar";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => {
      const tagLabel = navigation.getParam("tagLabel");
      if (tagLabel === undefined) {
        return (
          <SearchBar
            value={navigation.getParam("term", "")}
            onChange={navigation.getParam("onChange", () => null)}
            onSubmit={navigation.getParam("onSubmit", () => null)}
          />
        )
      } else {

        return <Text style={{ fontSize: 20 }}>;{navigation.getParam("tagLabel")}</Text>;
      }
    }
  });
  constructor(props) {
    super(props);
    const { navigation } = props;
    if (navigation.getParam("tagLabel") === "undefined") {
      this.state = {
        term: "",
        shouldFetch: false
      };
    } else {
      this.state = {
        term: navigation.getParam("tagLabel"),
        shouldFetch: true
      };
    }
    navigation.setParams({
      term: this.state.term,
      onChange: this.onChange,
      onSubmit: this.onSubmit
    });
  }
  onChange = text => {
    const { navigation } = this.props;
    this.setState({ term: text, shouldFetch: false });
    navigation.setParams({
      term: text
    });
  };
  onSubmit = () => {
    this.setState({ shouldFetch: true });
  };
  render() {
    const { term, shouldFetch } = this.state;
    return <SearchPresenter term={term} shouldFetch={shouldFetch} />;
  }
}